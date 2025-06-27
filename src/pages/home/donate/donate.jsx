import { useEffect, useMemo, useState } from 'react';
import { DonateText } from '../../../data/donate';
import { getPublicShareAmount, getTotalDonated, getDonationSequence } from '../../../contract/karma-token';
import { formatUnits, parseUnits } from 'ethers';
import { CONFIGS } from '../../../contract/constants';
import { ConnectKitButton } from 'connectkit'
import { useAccount, useConfig } from 'wagmi';
import { readContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { parseAbi } from 'viem';
import LoadingDots from '../../../components/Loading/Loading'

import './donate.css';

const USDT_ABI = parseAbi(CONFIGS.usdt.abi);
const KARMA_ABI = parseAbi(CONFIGS.karma.abi);

export default function Donate({ lang }) {
    const i18n = useMemo(() => DonateText[lang] ?? DonateText['en'], [lang]);
    const [popup, setPopup] = useState(false);
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [poolAmount, setPoolAmount] = useState(0);
    const [totalDonated, setTotalDonated] = useState(0);
    const [donationsCount, setDonationsCount] = useState(0);
    const [validate, setValidate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const account = useAccount();
    const config = useConfig();

    const donate = async () => {
        if (!account || !account.address) {
            return;
        }
        
        setValidate(true);
        if (loading || invalidAddress || invalidAmount) {
            return;
        }

        setLoading(true);
        setErrors(null);
        const { usdt, karma } = CONFIGS;
        const amt = parseUnits(amount, usdt.decimals);

        try {
            const allowance = await readContract(config, {
                address: usdt.address,
                abi: USDT_ABI,
                functionName: 'allowance',
                args: [account.address, karma.address]
            });

            if (allowance < amt) {
                await writeContract(config, {
                    address: usdt.address,
                    abi: USDT_ABI,
                    functionName: 'approve',
                    args: [karma.address, amt]
                });
            }

            const txDonate = await writeContract(config, {
                address: karma.address,
                abi: KARMA_ABI,
                functionName: 'donate',
                args: [amt, address],
                gas: 300_000
            });

            await waitForTransactionReceipt(config, {
                hash: txDonate
            });

            window.location.reload();
        } catch (error) {
            const msg = error?.message?.toLowerCase?.() 
                || error?.cause?.message?.toLowerCase?.()
                || '';
            if (error?.code !== 4001 && !msg.includes('user denied') && !msg.includes('rejected')) {
                setErrors(i18n.transitionFailed)
            }

            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const invalidAmount = useMemo(() => isNaN(Number(amount)) || Number(amount) <= 0, [amount]);
    const invalidAddress = useMemo(() => address.length !== 42, [address]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const [poolAmount, totalDonatedAmount, donationSeq] = await Promise.all([
                    getPublicShareAmount(),
                    getTotalDonated(),
                    getDonationSequence()
                ]);
                
                setPoolAmount(formatUnits(poolAmount, CONFIGS.usdt.decimals));
                setTotalDonated(formatUnits(totalDonatedAmount, CONFIGS.usdt.decimals));
                setDonationsCount(Number(donationSeq) - 1); // seq starts from 1, so subtract 1 to get count
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <button
                className="dt-button dt-button-main"
                onClick={() => setPopup(true)}
            >
                {i18n.donate}
            </button>
            <div className={`dt-mask ${!popup ? 'dt-hidden' : ''}`}>
                <div className="dt-dialog">
                    <div className='dt-header'>
                        <span className='title'>{i18n.donate}</span>
                        <ConnectKitButton.Custom>
                            {({ isConnected, show, truncatedAddress, ensName }) => {
                                return (
                                    <button onClick={show} className='dt-button-connect'>
                                        {isConnected ? ensName ?? truncatedAddress : i18n.connectWallet}
                                    </button>
                                );
                            }}
                        </ConnectKitButton.Custom>
                    </div>
                    <div className='dt-stats'>
                        <div className='dt-balance'>
                            {`${i18n.donations}: ${donationsCount}`}
                        </div>
                        <div className='dt-balance'>
                            {`${i18n.totalDonated}: ${Math.floor(Number(totalDonated))} USDT`}
                        </div>
                        <div className='dt-balance'>
                            {`${i18n.pool}: ${Math.floor(Number(poolAmount))} USDT`}
                        </div>
                    </div>
                    <div className='dt-input'>
                        <span>USDT</span>
                        <input
                            type='number'
                            placeholder={i18n.amount}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className={invalidAmount && validate ? 'invalid' : ''}
                            readOnly={loading}
                        />
                    </div>
                    <div className='dt-input'>
                        <span>{i18n.donateTo}</span>
                        <input
                            type='text'
                            placeholder={i18n.address}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={invalidAddress && validate ? 'invalid' : ''}
                            readOnly={loading}
                        />
                    </div>
                    <div className='dt-action'>
                        <button
                            className='dt-button dt-button-cancel'
                            onClick={() => {
                                if (!loading) {
                                    setErrors(null);
                                    setValidate(false);
                                    setPopup(false);
                                }
                            }}
                            disabled={loading}
                        >
                            {i18n.cancel}
                        </button>
                        <button
                            className='dt-button'
                            onClick={donate}
                            disabled={loading}
                        >
                            {loading ? <LoadingDots /> : <>{i18n.donate}</>}
                        </button>
                    </div>
                    {errors && <div className='errors'>{ errors }</div>}
                </div>
            </div>
        </>
    );
}