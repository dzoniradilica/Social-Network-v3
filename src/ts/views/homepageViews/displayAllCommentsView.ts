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

          const html = `
           ${
             +singleComment.post_id === +post_id
               ? ` <div class="comment"  data-comment_id="${singleComment.id}">
                        <p>${singleComment.content}</p>
                    </div> `
               : ''
           }
          `;

          singleCommentDiv.insertAdjacentHTML('beforeend', html);
        });
      });
    }, 1000);
  }
}

export const displayAllComments = new DisplayAllComments();
