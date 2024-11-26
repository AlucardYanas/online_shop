export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string } }) {
  const filters = searchParams.filters || '';
  const page = searchParams.page || '1';

  // Запрос к вашему API для получения данных каталога
  const response = await fetch(
    `http://localhost:3000/products?filter=${filters}&page=${page}&limit=10`
  );
  const data = await response.json();

  // Получаем URL первого изображения из списка продуктов, если он доступен
  const imageUrl = data.data[0]?.photo || ''; // Предполагается, что поле `photo` содержит ссылку на изображение

  return {
    title: `Catalog - Page ${page} - Filter: ${filters || 'All Products'}`,
    description: `Explore ${data.total || 0} products across ${data.totalPages || 1} pages.`,
    openGraph: {
      title: `Catalog - Page ${page}`,
      description: `Filter applied: ${filters || 'None'}. Total products: ${data.total || 0}`,
      images: imageUrl
        ? [
            {
              url: imageUrl, // Используем URL изображения из базы данных
              width: 1200,
              height: 630,
              alt: 'Catalog Image',
            },
          ]
        : [], // Если изображение недоступно, оставляем пустой массив
    },
  };
}
