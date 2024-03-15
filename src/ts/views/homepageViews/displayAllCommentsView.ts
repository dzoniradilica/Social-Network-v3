import { ConfigComment } from '../../configs/comment-config';

class DisplayAllComments {
  renderAllComments(allComments: ConfigComment[]) {
    setTimeout(() => {
      const postDiv = document.querySelectorAll(
        '.post'
      ) as NodeListOf<HTMLDivElement>;

      const commentDiv = document.querySelectorAll(
        '.comment-wrapper'
      ) as NodeListOf<HTMLDivElement>;

      allComments.forEach(singleComment => {
        postDiv.forEach((singleDiv, i) => {
          const post_id = singleDiv.dataset.post_id!;
          const singleCommentDiv = commentDiv[i];

          console.log(singleComment.content);

          const html = `
           ${
             +singleComment.post_id === +post_id
               ? ` <div class="comment">
                        <p>${singleComment.content}</p>
                    </div> `
               : ''
           }
          `;

          singleCommentDiv.insertAdjacentHTML('beforeend', html);
        });
      });
    }, 0);
  }
}

export const displayAllComments = new DisplayAllComments();
