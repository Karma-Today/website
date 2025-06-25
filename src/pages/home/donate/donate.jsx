import { useEffect, useMemo, useState } from 'react';
import { DonateText } from '../../../data/donate';
import { getPublicShareAmount } from '../../../contract/karma-token';
import { useWallet } from '../../../contract/wallet';
import { shortAccount } from '../../../utils'
import { formatUnits, parseUnits } from 'ethers';
import { CONFIGS } from '../../../contract/constants';
import LoadingDots from '../../../components/Loading/Loading'
import './donate.css';

export default function Donate({ lang }) {
    const i18n = useMemo(() => DonateText[lang] ?? DonateText['en'], [lang]);
    const [popup, setPopup] = useState(false);
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [poolAmount, setPoolAmount] = useState(0);
    const [validate, setValidate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const { account, connectWallet, getContract } = useWallet();

    const donate = async () => {
        if (!account) {
            connectWallet();
            return;
        }
        
        setValidate(true);
        if (loading || invalidAddress || invalidAmount) {
            return;
        }

        setLoading(true);
        setErrors(null);
        const { usdt, karma } = CONFIGS;

        try {
            const usdtContract = await getContract(usdt.address, usdt.abi);
            const allowance = await usdtContract.allowance(account, karma.address);
            console.log("allowance", allowance);
            const amt = parseUnits(amount, usdt.decimals);
            if (allowance < amt) {
                const approvedTx = await usdtContract.approve(karma.address, amt);
                await approvedTx.wait();
            }

            const karmaContract = await getContract(karma.address, karma.abi);
            const tx = await karmaContract.mint(amt, address, { gasLimit: 300_000 });
            await tx.wait();

            window.location.reload();
        } catch(error) {
            if (!error.code || (error.code !== 'ACTION_REJECTED' && error.code !== 4001)) {
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
        const fetchAmount = async() => {
            const amount = await getPublicShareAmount();
            setPoolAmount(formatUnits(amount, CONFIGS.usdt.decimals));
        }

        fetchAmount();
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
                        {account
                            ? <span className='account'>
                                { shortAccount(account) }
                            </span>
                            : <button className='dt-button-connect' onClick={connectWallet}>
                                {i18n.connectWallet}
                            </button>
                        }
                    </div>
                    <div className='dt-balance'>
                        {`${i18n.pool}: ${poolAmount} USDT`}
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