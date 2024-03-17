class News {
  async getAll() {
    const res = await fetch(
      'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3b34e08bc75f4357b6339821d84ebf71'
    );
    const data = await res.json();

    const [new1, new2] = data.articles;

    return [new1, new2];
  }
}

export const news = new News();
