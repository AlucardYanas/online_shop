import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/catalog');
  return null; // Фактически ничего не рендерим, так как происходит редирект
}
