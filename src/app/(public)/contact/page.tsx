'use client';

import { useState } from 'react';
import { Button, Input, Textarea, Alert } from '@/components/ui';
import { contactApi } from '@/lib/api';
import { useTranslation } from '@/context';
import type { ContactFormData } from '@/types';
import { isValidEmail } from '@/lib/utils';

// ============================================
// Contact Page
// ============================================

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contact.validation.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contact.validation.emailRequired;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = t.contact.validation.emailInvalid;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t.contact.validation.subjectRequired;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.validation.messageRequired;
    } else if (formData.message.length < 10) {
      newErrors.message = t.contact.validation.messageMinLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await contactApi.submit(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="page-header">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              {t.contact.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                {t.contact.info.title}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.contact.info.address}</h3>
                    <p className="text-gray-600 mt-1">
                      123 Community Center Drive<br />
                      College Station, TX 77840
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.contact.info.email}</h3>
                    <a
                      href="mailto:info@itc.org"
                      className="text-primary-600 hover:text-primary-700 mt-1 block"
                    >
                      info@itc.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.contact.info.phone}</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-primary-600 hover:text-primary-700 mt-1 block"
                    >
                      (123) 456-7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.contact.info.hours}</h3>
                    <p className="text-gray-600 mt-1 whitespace-pre-line">
                      {t.contact.info.hoursDetail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                  {t.contact.form.title}
                </h2>

                {submitStatus === 'success' && (
                  <Alert variant="success" className="mb-6">
                    {t.contact.form.success}
                  </Alert>
                )}

                {submitStatus === 'error' && (
                  <Alert variant="error" className="mb-6">
                    {t.contact.form.error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label={t.contact.form.name}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                      placeholder={t.contact.form.namePlaceholder}
                    />
                    <Input
                      label={t.contact.form.email}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label={t.contact.form.phone}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.contact.form.phonePlaceholder}
                      hint={t.contact.form.optional}
                    />
                    <Input
                      label={t.contact.form.subject}
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={errors.subject}
                      required
                      placeholder={t.contact.form.subjectPlaceholder}
                    />
                  </div>

                  <Textarea
                    label={t.contact.form.message}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                    placeholder={t.contact.form.messagePlaceholder}
                    rows={6}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {t.contact.form.submit}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-gray-200">
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p>Interactive map will be embedded here</p>
            <p className="text-sm mt-1">Google Maps or similar integration</p>
          </div>
        </div>
      </section>
    </>
  );
}
