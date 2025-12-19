import { Link } from "react-router-dom";

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
          {/* Header */}
          <div className="mb-8 border-b border-gray-200 pb-8">
            <h1 className="text-3xl font-bold text-black">Privacy Policy</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated: December 19, 2024</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-black">1. Introduction</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                E-Store ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how
                we collect, use, disclose, and safeguard your information when you use our website, mobile application,
                and services.
              </p>
              <p className="mt-3 leading-relaxed text-gray-600">
                Please read this Privacy Policy carefully. By using our Services, you consent to the practices described
                in this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-xl font-semibold text-black">2. Information We Collect</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We collect information that you provide directly to us and information that is collected automatically
                when you use our Services.
              </p>

              <h3 className="mt-4 text-lg font-medium text-black">Personal Information</h3>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-600">
                <li>Name and contact information (email, phone number, address)</li>
                <li>Account credentials (email and password)</li>
                <li>Payment information (credit card numbers, billing address)</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>

              <h3 className="mt-4 text-lg font-medium text-black">Automatically Collected Information</h3>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-gray-600">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, click patterns)</li>
                <li>Location data (with your consent)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-xl font-semibold text-black">3. How We Use Your Information</h2>
              <p className="mt-3 leading-relaxed text-gray-600">We use the information we collect to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>Process and fulfill your orders</li>
                <li>Manage your account and provide customer support</li>
                <li>Send transactional communications (order confirmations, shipping updates)</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Personalize your shopping experience</li>
                <li>Improve our Services and develop new features</li>
                <li>Detect and prevent fraud and unauthorized access</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-xl font-semibold text-black">4. Information Sharing</h2>
              <p className="mt-3 leading-relaxed text-gray-600">We may share your information with:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  <strong>Service Providers:</strong> Third parties who perform services on our behalf (payment
                  processing, shipping, analytics)
                </li>
                <li>
                  <strong>Business Partners:</strong> With your consent, for marketing purposes
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets
                </li>
              </ul>
              <p className="mt-3 leading-relaxed text-gray-600">
                We do not sell your personal information to third parties.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-xl font-semibold text-black">5. Cookies and Tracking Technologies</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  <strong>Essential Cookies:</strong> Required for basic site functionality
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors use our site
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Remember your settings and preferences
                </li>
              </ul>
              <p className="mt-3 leading-relaxed text-gray-600">
                You can manage cookie preferences through your browser settings.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-xl font-semibold text-black">6. Data Security</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We implement appropriate technical and organizational measures to protect your personal information,
                including:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure storage with encryption at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and employee training</li>
              </ul>
              <p className="mt-3 leading-relaxed text-gray-600">
                However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-xl font-semibold text-black">7. Your Rights and Choices</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  <strong>Access:</strong> Request a copy of your personal information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal information
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to another service
                </li>
                <li>
                  <strong>Opt-out:</strong> Unsubscribe from marketing communications
                </li>
              </ul>
              <p className="mt-3 leading-relaxed text-gray-600">
                To exercise these rights, please contact us using the information below.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-xl font-semibold text-black">8. Data Retention</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this
                Privacy Policy, unless a longer retention period is required by law. When we no longer need your
                information, we will securely delete or anonymize it.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-xl font-semibold text-black">9. Children's Privacy</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                Our Services are not intended for children under 13 years of age. We do not knowingly collect personal
                information from children under 13. If we become aware that we have collected information from a child
                under 13, we will take steps to delete such information.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-xl font-semibold text-black">10. International Data Transfers</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-xl font-semibold text-black">11. Changes to This Policy</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new Privacy Policy on our website and updating the "Last updated" date. Your continued use
                of our Services after such changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-semibold text-black">12. Contact Us</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-3 rounded-lg bg-gray-50 p-4">
                <p className="text-gray-600">
                  <strong>Email:</strong> privacy@e-store.com
                </p>
                <p className="mt-1 text-gray-600">
                  <strong>Address:</strong> 123 Commerce Street, Suite 100, New York, NY 10001
                </p>
                <p className="mt-1 text-gray-600">
                  <strong>Data Protection Officer:</strong> dpo@e-store.com
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link to="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-black">
                ← Back to Home
              </Link>
              <Link to="/terms" className="text-sm font-medium text-gray-600 transition-colors hover:text-black">
                Terms of Service →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
