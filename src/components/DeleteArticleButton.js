import { deleteArticleButton } from '../utils/api';
import { Button } from 'react-bootstrap';
export const DeleteArticleButton = ({ article, articles, setArticles }) => {
  return (
    <Button
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
    </Button>
  );
};
