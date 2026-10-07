'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Alert } from '@/components/ui';
import { useTranslation } from '@/context';
import { cn } from '@/lib/utils';

// ============================================
// Donation Amounts
// ============================================

const donationAmounts = [25, 50, 100, 250, 500, 1000];

// ============================================
// Donate Page
// ============================================

export default function DonatePage() {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const finalAmount = selectedAmount || parseInt(customAmount) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Online payments are not enabled yet; supporters are directed to the Secretariat.
    window.location.href = '/contact';
  };

  // Icons for impact items
  const impactIcons = [
    <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>,
    <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
    <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>,
    <svg key="4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>,
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="page-header">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t.donate.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.donate.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div>
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  {t.donate.form.title}
                </h2>

                <Alert variant="info" className="mb-6">
                  Online giving is not open yet. To support the Council's work, please get in touch with the ITC Secretariat through the Contact page.
                </Alert>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Amount Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {t.donate.form.selectAmount}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {donationAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => handleAmountSelect(amount)}
                          className={cn(
                            'py-3 px-4 rounded-lg font-semibold text-lg transition-colors border-2',
                            selectedAmount === amount
                              ? 'bg-primary-600 text-white border-primary-600'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300'
                          )}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.donate.form.customAmount}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        $
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder={t.donate.form.customPlaceholder}
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  {/* Recurring */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={isRecurring}
                      onChange={(e) => setIsRecurring(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="recurring" className="text-gray-700">
                      {t.donate.form.monthly}
                    </label>
                  </div>

                  {/* Donor Info */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">{t.donate.form.yourInfo}</h3>
                    <Input
                      label={t.donate.form.name}
                      value={donorInfo.name}
                      onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })}
                      required
                      placeholder={t.contact.form.namePlaceholder}
                    />
                    <Input
                      label={t.donate.form.email}
                      type="email"
                      value={donorInfo.email}
                      onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })}
                      required
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t.donate.form.message}
                      </label>
                      <textarea
                        value={donorInfo.message}
                        onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })}
                        rows={3}
                        placeholder={t.donate.form.messagePlaceholder}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      disabled={finalAmount <= 0}
                    >
                      {finalAmount > 0
                        ? `${t.donate.form.submit} $${finalAmount}${isRecurring ? '/month' : ''}`
                        : t.donate.form.selectAmountError}
                    </Button>
                    <p className="text-sm text-gray-500 text-center mt-3">
                      {t.donate.form.taxDeductible}
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Impact Section */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                {t.donate.impact.title}
              </h2>
              <p className="text-gray-600 mb-8">
                {t.donate.impact.subtitle}
              </p>

              <div className="space-y-6">
                {t.donate.impact.items.map((item, index) => (
                  <div
                    key={item.amount}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 flex-shrink-0">
                      {impactIcons[index]}
                    </div>
                    <div>
                      <span className="text-lg font-bold text-primary-600">{item.amount}</span>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-4">{t.donate.why.title}</h3>
                <ul className="space-y-3">
                  {t.donate.why.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {t.donate.questions}{' '}
                  <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                    {t.nav.contact}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
