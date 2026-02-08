import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read DKPUCS privacy policy to understand how we collect, use, and protect your personal information. Learn about our data practices, cookies, and third-party services.",
  keywords: [
    "privacy policy",
    "data protection",
    "DKPUCS privacy",
    "user data",
    "cookies",
    "data security",
  ],
  openGraph: {
    title: "Privacy Policy - DKPUCS",
    description:
      "Read our privacy policy to understand how we handle your data.",
    url: "https://dkpucs.vercel.app/privacy-policy",
    type: "website",
  },
  alternates: {
    canonical: "https://dkpucs.vercel.app/privacy-policy",
  },
  robots: {
    index: true,
    follow: false,
  },
};

/**
 * Renders the Privacy Policy page containing sections on information collection, how information is used, cookies, third-party services, policy changes, and contact information.
 *
 * @returns The React element for the Privacy Policy page layout and content.
 */
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            Last updated: <time dateTime="2025-11-15">November 15, 2025</time>
          </p>
          <p>
            Your privacy is important to us. It is our policy to respect your
            privacy regarding any information we may collect from you across our
            website.
          </p>
          <h2>1. Information we collect</h2>
          <p>
            We only ask for personal information when we truly need it to
            provide a service to you. We collect it by fair and lawful means,
            with your knowledge and consent. We also let you know why we’re
            collecting it and how it will be used.
          </p>
          <h2>2. How we use your information</h2>
          <p>
            We only retain collected information for as long as necessary to
            provide you with your requested service. What data we store, we’ll
            protect within commercially acceptable means to prevent loss and
            theft, as well as unauthorized access, disclosure, copying, use or
            modification.
          </p>
          <h2>3. Cookies</h2>
          <p>
            We use cookies to help improve your experience of our website. This
            cookie policy is part of our privacy policy, and covers the use of
            cookies between your device and our site.
          </p>
          <h2>4. Third-party services</h2>
          <p>
            We may employ third-party companies and individuals on our websites
            - for example, analytics providers and content partners. These third
            parties have access to your personal information only to perform
            specific tasks on our behalf, and are obligated not to disclose or
            use it for any other purpose.
          </p>
          <h2>5. Changes to our Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
