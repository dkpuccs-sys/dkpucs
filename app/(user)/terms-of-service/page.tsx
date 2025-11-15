import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>Last updated: November 15, 2025</p>
          <h2>1. Terms</h2>
          <p>
            By accessing this website, you are agreeing to be bound by these
            Terms of Service, all applicable laws and regulations, and agree
            that you are responsible for compliance with any applicable local
            laws.
          </p>
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on this website for personal,
            non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title, and under this license you may
            not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>
              use the materials for any commercial purpose, or for any public
              display (commercial or non-commercial);
            </li>
            <li>
              attempt to decompile or reverse engineer any software contained on
              this website;
            </li>
            <li>
              remove any copyright or other proprietary notations from the
              materials; or
            </li>
            <li>
              transfer the materials to another person or &quot;mirror&quot; the
              materials on any other server.
            </li>
          </ul>
          <h2>3. Disclaimer</h2>
          <p>
            The materials on this website are provided on an &apos;as is&apos; basis.
            We make no warranties, expressed or implied, and hereby disclaim
            and negate all other warranties including, without limitation,
            implied warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>
          <h2>4. Limitations</h2>
          <p>
            In no event shall we be liable for any damages (including, without
            limitation, damages for loss of data or profit, or due to business
            interruption) arising out of the use or inability to use the
            materials on this website, even if we or an authorized
            representative has been notified orally or in writing of the
            possibility of such damage.
          </p>
          <h2>5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of our country and you irrevocably submit
            to the exclusive jurisdiction of the courts in that State or
            location.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
