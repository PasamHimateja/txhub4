import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    ShieldCheck, CreditCard, Smartphone,
    CheckCircle, ArrowLeft, Lock, BadgePercent,
    GraduationCap, Zap, ChevronRight, Check
} from 'lucide-react';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const locationData = location.state;

    let storedData = null;
    try {
        const item = localStorage.getItem("studentData");
        if (item && item !== "undefined") {
            storedData = JSON.parse(item);
        }
    } catch (err) {
        console.warn("Failed to parse studentData from localStorage", err);
    }

    const studentData = locationData?.studentDetails || storedData;

    const studentId = locationData?.studentId || studentData?.id;

    const [paymentPlan, setPaymentPlan] = useState('full');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!studentData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="text-slate-400" size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Session Expired</h2>
                <p className="text-slate-500 text-sm mb-6">Please restart your registration process.</p>
                <button onClick={() => navigate('/register')} className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    Return to Registration
                </button>
            </div>
        );
    }

    const getBillingDetails = () => {
        let basePrice = 0;
        if (studentData.enrollmentType === 'Course') basePrice = 2999;
        if (studentData.enrollmentType === 'Internship') basePrice = 1999;
        if (studentData.enrollmentType === 'Course+Internship') basePrice = 3999;

        let discount = 0;
        if (studentData.couponCode === 'SAVE10') discount = basePrice * 0.1;

        const totalFee = basePrice - discount;
        let amountDueNow = totalFee;
        let remainingBalance = 0;

        if (paymentPlan === 'half') {
            amountDueNow = totalFee / 2;
            remainingBalance = totalFee / 2;
        } else if (paymentPlan === 'admission') {
            amountDueNow = 999;
            remainingBalance = totalFee - 999;
        }

        return { basePrice, discount, totalFee, amountDueNow, remainingBalance };
    };

    const { basePrice, discount, totalFee, amountDueNow, remainingBalance } = getBillingDetails();

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(async () => {
            try {
                if (!studentId) {
                    console.error("Student ID is missing!");
                    return;
                }

                const response = await fetch(`http://127.0.0.1:8000/api/update-payment/${studentId}/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        paidAmount: amountDueNow,
                        totalFee: totalFee
                    }),
                });

                const data = await response.json();
                console.log("Payment response:", data);

                setIsSuccess(true);

            } catch (err) {
                console.error("Payment update failed:", err);
            } finally {
                setIsProcessing(false);
            }
        }, 2000);
    };

    // SUCCESS STATE
    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-indigo-100 max-w-md w-full text-center border border-slate-100">
                    <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="text-emerald-500" size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Payment Successful</h2>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                        Welcome, <strong className="text-slate-800">{studentData.name}</strong>. Your payment of <strong className="text-emerald-600">₹{amountDueNow.toFixed(2)}</strong> is confirmed.
                        {remainingBalance > 0 && ` Your remaining balance is ₹${remainingBalance.toFixed(2)}.`}
                    </p>
                    <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left border border-slate-100 text-sm">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-500">Transaction ID</span>
                            <span className="font-bold text-slate-800">TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">Program</span>
                            <span className="font-bold text-indigo-600">{studentData.courseType}</span>
                        </div>
                    </div>
                    <button onClick={() => navigate('/')} className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20">
                        Access Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F4F9] py-10 px-4 sm:px-6 lg:px-8 font-sans flex flex-col items-center">

            <div className="w-full max-w-[1100px]">

                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold text-sm mb-6 transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Registration
                </button>

                {/* MAIN CONTAINER */}
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col lg:flex-row border border-slate-200/60">

                    {/* LEFT SIDE: MIDNIGHT BLUE INVOICE */}
                    <div className="bg-[#0B0F19] relative p-10 lg:p-12 lg:w-[42%] flex flex-col overflow-hidden text-white">
                        {/* Subtle Premium Glow */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

                        <div className="relative z-10 flex-1">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10">
                                    <GraduationCap className="text-indigo-300" size={24} />
                                </div>
                                <h2 className="text-xl font-bold tracking-tight text-white">Order Summary</h2>
                            </div>

                            <div className="mb-10">
                                <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-2">Enrolling In</p>
                                <p className="font-black text-3xl leading-tight mb-4 text-white">{studentData.courseType}</p>
                                <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/30">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                    <span className="text-[11px] font-bold text-indigo-100 uppercase tracking-wider">{studentData.enrollmentType} • {studentData.mode}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-medium">Base Tuition</span>
                                    <span className="font-semibold text-white">₹{basePrice.toFixed(2)}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between items-center text-sm font-bold text-emerald-400">
                                        <span className="flex items-center gap-1.5">
                                            <BadgePercent size={16} /> Coupon ({studentData.couponCode})
                                        </span>
                                        <span>-₹{discount.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Total Due Highlight */}
                        <div className="relative z-10 mt-10 bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Total Due Today</p>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-2xl font-medium text-slate-300">₹</span>
                                <span className="text-5xl font-black tracking-tighter text-white">{amountDueNow.toFixed(2)}</span>
                            </div>

                            {remainingBalance > 0 ? (
                                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-medium">Remaining Balance</span>
                                    <span className="text-amber-400 font-bold">₹{remainingBalance.toFixed(2)}</span>
                                </div>
                            ) : (
                                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-emerald-400 font-bold">
                                    <CheckCircle size={16} /> Fully Paid Upfront
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE: CRISP WHITE PAYMENT UI */}
                    <div className="p-8 lg:p-12 lg:w-[58%] bg-white flex flex-col justify-center">
                        <form onSubmit={handlePayment} className="space-y-8">

                            {/* 1. PAYMENT PLAN */}
                            <div>
                                <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2 tracking-tight">
                                    <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                                    Select Payment Plan
                                </h3>

                                <div className="space-y-3">
                                    {[
                                        { id: 'full', title: 'Full Settlement', desc: 'Pay 100% upfront. No remaining dues.', amount: totalFee },
                                        { id: 'half', title: 'Split Installment (50%)', desc: 'Pay half now, and half midway.', amount: totalFee / 2, popular: true },
                                        { id: 'admission', title: 'Seat Booking', desc: 'Secure your slot today.', amount: 999.00 }
                                    ].map((plan) => (
                                        <label
                                            key={plan.id}
                                            className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentPlan === plan.id
                                                ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                                                : 'border-slate-100 hover:border-slate-300'
                                                }`}
                                            onClick={() => setPaymentPlan(plan.id)}
                                        >
                                            {/* Popular Badge */}
                                            {plan.popular && (
                                                <div className="absolute -top-2.5 right-4 bg-amber-400 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                                                    <Zap size={10} className="fill-white" /> Popular
                                                </div>
                                            )}

                                            {/* Custom Radio Button */}
                                            <div className={`w-5 h-5 mr-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${paymentPlan === plan.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                                                }`}>
                                                {paymentPlan === plan.id && <Check size={12} className="text-white" strokeWidth={3} />}
                                            </div>

                                            <div className="flex-1 flex justify-between items-center">
                                                <div>
                                                    <span className={`block font-bold text-sm mb-0.5 ${paymentPlan === plan.id ? 'text-indigo-950' : 'text-slate-700'}`}>{plan.title}</span>
                                                    <span className="block text-[11px] font-medium text-slate-500">{plan.desc}</span>
                                                </div>
                                                <span className="font-black text-sm text-slate-900">₹{plan.amount.toFixed(2)}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 2. PAYMENT METHOD */}
                            <div>
                                <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2 tracking-tight">
                                    <span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                                    Payment Method
                                </h3>

                                {/* Method Tabs */}
                                <div className="flex p-1 bg-slate-100/80 rounded-xl mb-5 w-full sm:w-fit border border-slate-200/50">
                                    <button type="button" onClick={() => setPaymentMethod('card')} className={`flex-1 py-2.5 px-6 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${paymentMethod === 'card' ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}>
                                        <CreditCard size={16} /> Credit/Debit
                                    </button>
                                    <button type="button" onClick={() => setPaymentMethod('upi')} className={`flex-1 py-2.5 px-6 text-sm font-bold rounded-lg transition-all flex justify-center items-center gap-2 ${paymentMethod === 'upi' ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/50' : 'text-slate-500 hover:text-slate-800'}`}>
                                        <Smartphone size={16} /> UPI Apps
                                    </button>
                                </div>

                                {/* Inputs */}
                                <div className="min-h-[190px]">
                                    {paymentMethod === 'card' ? (
                                        <div className="space-y-4 animate-in fade-in duration-300">
                                            <div className="relative">
                                                <input type="text" placeholder="Card Number" className="w-full bg-white border border-slate-200 rounded-xl p-4 pl-12 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-mono text-sm placeholder:text-slate-400 text-slate-900 shadow-sm" />
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="text" placeholder="MM/YY" className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-mono text-sm placeholder:text-slate-400 text-slate-900 text-center shadow-sm" />
                                                <input type="password" placeholder="CVC" className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-mono text-sm placeholder:text-slate-400 text-slate-900 text-center tracking-widest shadow-sm" />
                                            </div>
                                            <input type="text" defaultValue={studentData.name} placeholder="Name on Card" className="w-full bg-white border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-sm font-bold text-slate-800 uppercase shadow-sm" />
                                        </div>
                                    ) : (
                                        <div className="bg-slate-50 h-full p-8 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center animate-in fade-in duration-300 shadow-sm">
                                            <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-4">
                                                <Smartphone className="text-indigo-600" size={28} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-800 mb-1">Enter your UPI ID</p>
                                            <p className="text-[11px] font-medium text-slate-500 mb-5">A secure payment request will be sent to your mobile app.</p>
                                            <input type="text" placeholder="username@upi" className="w-full max-w-[250px] bg-white border border-slate-200 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-sm font-medium text-center shadow-sm" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ACTION BUTTON */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${isProcessing
                                        ? 'bg-indigo-300 text-white cursor-not-allowed'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 active:scale-[0.98]'
                                        }`}
                                    style={{ padding: '1.125rem' }}
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>Pay ₹{amountDueNow.toFixed(2)} Securely <ChevronRight size={18} className="ml-1" /></>
                                    )}
                                </button>

                                <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                    256-Bit Secure Encrypted Connection
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;