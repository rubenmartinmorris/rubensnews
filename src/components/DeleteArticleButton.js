import { deleteArticleButton } from '../utils/api';
export const DeleteArticleButton = ({ article, articles, setArticles }) => {
  return (
    <button
      onClick={() => {
        deleteArticleButton(article.article_id);
        const newArticles = articles.filter((filterdArticle) => {
          return filterdArticle.article_id !== article.article_id;
        });
        console.log(newArticles);

        setArticles(newArticles);
      }}
    >
      Delete my Article
    </button>
  );
};
