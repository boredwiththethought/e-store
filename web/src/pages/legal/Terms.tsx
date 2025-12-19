import { Link } from "react-router-dom";

export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
          {/* Header */}
          <div className="mb-8 border-b border-gray-200 pb-8">
            <h1 className="text-3xl font-bold text-black">Terms of Service</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated: December 19, 2024</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-xl font-semibold text-black">1. Introduction</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                Welcome to E-Store. These Terms of Service ("Terms") govern your use of our website, mobile application,
                and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound
                by these Terms.
              </p>
              <p className="mt-3 leading-relaxed text-gray-600">
                Please read these Terms carefully before using our Services. If you do not agree to these Terms, you may
                not access or use our Services.
              </p>
            </section>

            {/* Account Registration */}
            <section>
              <h2 className="text-xl font-semibold text-black">2. Account Registration</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                To access certain features of our Services, you may need to create an account. When you create an
                account, you agree to:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            {/* Products and Pricing */}
            <section>
              <h2 className="text-xl font-semibold text-black">3. Products and Pricing</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product
                descriptions, pricing, or other content is accurate, complete, or error-free.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>All prices are displayed in USD unless otherwise noted</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to correct any errors in pricing</li>
                <li>Promotional offers may have additional terms and conditions</li>
              </ul>
            </section>

            {/* Orders and Payment */}
            <section>
              <h2 className="text-xl font-semibold text-black">4. Orders and Payment</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                By placing an order, you represent that the products ordered will be used only in a lawful manner. We
                reserve the right to refuse or cancel any order for any reason.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>All payments must be made in full before order processing</li>
                <li>We accept major credit cards, debit cards, and digital wallets</li>
                <li>You are responsible for any applicable taxes and duties</li>
                <li>Order confirmation does not guarantee product availability</li>
              </ul>
            </section>

            {/* Shipping and Delivery */}
            <section>
              <h2 className="text-xl font-semibold text-black">5. Shipping and Delivery</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We offer various shipping options. Delivery times are estimates and are not guaranteed. Risk of loss and
                title for items pass to you upon delivery to the carrier.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>Shipping costs are calculated at checkout</li>
                <li>International orders may be subject to customs fees</li>
                <li>We are not responsible for delays caused by carriers or customs</li>
                <li>Please ensure accurate delivery information is provided</li>
              </ul>
            </section>

            {/* Returns and Refunds */}
            <section>
              <h2 className="text-xl font-semibold text-black">6. Returns and Refunds</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We want you to be satisfied with your purchase. If you are not completely satisfied, you may return
                eligible items within 30 days of delivery for a refund or exchange.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
                <li>Items must be unused and in original packaging</li>
                <li>Some items may not be eligible for return (e.g., personalized items)</li>
                <li>Refunds will be processed within 5-10 business days</li>
                <li>Original shipping costs are non-refundable</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-xl font-semibold text-black">7. Intellectual Property</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                All content on our Services, including text, graphics, logos, images, and software, is the property of
                E-Store or its licensors and is protected by intellectual property laws.
              </p>
              <p className="mt-3 leading-relaxed text-gray-600">
                You may not reproduce, distribute, modify, or create derivative works from any content without our
                express written permission.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-xl font-semibold text-black">8. Limitation of Liability</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                To the maximum extent permitted by law, E-Store shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising from your use of our Services.
              </p>
              <p className="mt-3 leading-relaxed text-gray-600">
                Our total liability shall not exceed the amount you paid for the products or services giving rise to the
                claim.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-xl font-semibold text-black">9. Governing Law</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without
                regard to its conflict of law provisions.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-xl font-semibold text-black">10. Changes to Terms</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by
                posting the new Terms on our website. Your continued use of our Services after such changes constitutes
                your acceptance of the new Terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-xl font-semibold text-black">11. Contact Us</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-3 rounded-lg bg-gray-50 p-4">
                <p className="text-gray-600">
                  <strong>Email:</strong> legal@e-store.com
                </p>
                <p className="mt-1 text-gray-600">
                  <strong>Address:</strong> 123 Commerce Street, Suite 100, New York, NY 10001
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
              <Link to="/privacy" className="text-sm font-medium text-gray-600 transition-colors hover:text-black">
                Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
