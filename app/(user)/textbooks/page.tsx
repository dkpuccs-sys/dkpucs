import { getTextbooks } from '@/lib/data';
import TextbooksClientPage from './textbooks-client-page';

export default async function TextbooksPage() {
  const textbooks = await getTextbooks();
  return <TextbooksClientPage initialTextbooks={textbooks} />;
}
