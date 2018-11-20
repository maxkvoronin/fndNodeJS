(() => {
  const postsUrl = '/api/posts';
  //const commentsUrl = '/api/comments';
  //const commentUrl = '/api/comment';

  const feed = document.getElementById('feed');
  const createPost = document.getElementById('createPost');
  const postTextCreate = document.getElementById('postTextCreate');
  const postAttachCreate = document.getElementById('postAttachCreate');
  const postImageCreate = document.getElementById('postImageCreate');
  const postPublishCreate = document.getElementById('postPublishCreate');

  const postTextEdit = document.getElementById('postTextEdit');
  const postAttachEdit = document.getElementById('postAttachEdit');
  const postImageEdit = document.getElementById('postImageEdit');
  const postPublishEdit = document.getElementById('postPublishEdit');

  const commentText = document.getElementById('commentText');
  const commentPublish = document.getElementById('commentPublish');

  const commentTextEdit = document.getElementById('commentTextEdit');
  const commentPublishEdit = document.getElementById('commentPublishEdit');

  const but = document.getElementsByClassName('close');

  let actualPosts = [];

  init();

  function init () {
    fetch(postsUrl)
      .then(response => response.json())
      .then(response => {
        actualPosts = response;
        renderPosts(actualPosts);
        renderComments(actualPosts);
        initListeners();
      })
      .catch(e => console.log(e));
  }


  function renderPosts (posts) {
    feed.innerHTML = '';
    console.table(posts);
    posts.forEach(post => {
      feed.innerHTML += `<li class="rv b agz">
          <img class="bos vb yb aff" src="${post.author[0].avatar}">
          <div class="rw">
          
            <div class="bpb">
              <small class="acx axc">${moment(post.publicationDate).format('YYYY-MM-DD HH:mm')}</small>
              <h6>${post.author[0].name}</h6>
            </div>
            <p>${post.text}
            </p>` +
            pictureCode(post.picture) + `
               <a href="#postModalEdit" class="boa" data-toggle="modal" for="edit" data-id="${post._id}">
                    <button class="cg nz ok" data-id="${post._id}" for="edit" title="Редактировать пост">Редактировать пост</button>
                </a>
                <a href="#postModalComment" class="boa" data-toggle="modal" for="comment" data-id="${post._id}">
                    <button class="cg nz ok" data-id="${post._id}" for="comment" title="Оставить комментарий">Оставить комментарий</button>
                </a>
                    <button type="button" class="close" aria-hidden="true" title="${post._id}" data-deleteId="${post._id}">×</button>
                <hr>
                <ul class="bow afa commentBlock" id="comment-${post._id}">
                </ul>
                
            </div>
        </li>`;
    });


    function pictureCode (pic) {
      const str = `<div class="boy" data-grid="images"><img style="display: inline-block; width: 346px; height: 335px; margin-bottom: 10px; margin-right: 0px; vertical-align: bottom;" data-width="640" data-height="640" data-action="zoom" src="${pic}"></div>`;
      return pic ? str : '';
    }
  }

  function renderComments(posts) {

    posts.forEach(post => {
      const commentBlock = document.getElementById(`comment-${post._id}`);
      fetch(`${postsUrl}/${post._id}/comments`)
        .then(response => response.json())
        .then(response => {
          if (response.message !== 'empty') {
          response.comments_id
            .forEach(comment => {
              commentBlock.innerHTML += `
                              <li class="rv afh">
                                <div class="qa">
                                    <div class="rv">
                                        <img class="bos us aff yb" src="${comment.author_id.avatar}">
                                        <div class="rw">
                                            <div class="bpd">
                                                <div class="bpb">
                                                    <small class="acx axc">${moment(comment.publicationDate).fromNow()}</small>
                                                    <h6>${comment.author_id.name}</h6>
                                                </div>
                                                <div class="bpb">
                                                ${comment.text}
                                                </div>
                                                
                                                <a href="#postModalCommentEdit" class="boa" data-toggle="modal" for="edit-comment" data-id=${comment._id}>
                                                    <button type="button" class="cg axo axu oh" data-id=${comment._id} for="edit-comment" title="Оставить комментарий">Редактировать комментарий</button>
                                                </a>
                                                <button type="button" class="close" aria-hidden="true" data-id=${comment._id} for="delete-comment" title="Удалить">
                                                    <span class="h bbg" data-id=${comment._id} for="delete-comment"></span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              </li>
                    `
            });
          }
        })


    })

  }

  function initListeners () {
    createPost.addEventListener('click', createPostListener);
    feed.addEventListener('click', editPostListener);
    feed.addEventListener('click', publishCommentListener);
    feed.addEventListener('click', editCommentListener);
    feed.addEventListener('click', deleteCommentListener);

    feed.querySelectorAll('.close').forEach(elem => {
      elem.addEventListener('click', deletePostListener);
    });
  }

  function deletePostListener(event) {
    const id = event.target.getAttribute('data-deleteId');
    fetch(`${postsUrl}/${id}`, {
      method: 'DELETE',
    }).then(response => {
      console.log(response);
      event.preventDefault();
      init();
    });
  }

  function editPostListener (event) {
    if (!event.target.getAttribute('data-id') ||
      event.target.getAttribute('for') === 'edit-comment' ||
      event.target.getAttribute('for') === 'delete-comment') {
      return;
    }

    const id = event.target.getAttribute('data-id');
    fetch(`${postsUrl}/${id}`)
      .then(res => res.json())
      .then(post => {
        postTextEdit.value = post.text;

        postImageEdit.setAttribute('src', 'https://via.placeholder.com/346x335.png');

        console.log('>> ' + post.picture);

        if (post.picture)
          postImageEdit.setAttribute('src', `${post.picture}`);

        postAttachEdit.addEventListener('change', (event) => {
          if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);

            reader.onload = (event) => {
              postImageEdit.setAttribute('src', `${event.target.result}`);
            };
          }
        });

        const publishHandler = () => {
          let formData = new FormData();
          formData.append('text', postTextEdit.value);

          if (postAttachEdit.files[0]) {
            formData.append('picture', postAttachEdit.files[0], 'postPicture');
          } else {
            formData.append('picture', postImageEdit.getAttribute('src'));
          }

          fetch(`${postsUrl}/${id}`, {
            method: 'PATCH',
            body: formData
          }).then(response => {
            console.log(response);
            postPublishEdit.removeEventListener('click', publishHandler);
            init();
          });
        };

        postPublishEdit.addEventListener('click', publishHandler);
      });
  }

  function editCommentListener(event) {
    if (!event.target.getAttribute("data-id") || event.target.getAttribute('for') !== 'edit-comment') {
      return;
    }

    const commentId = event.target.getAttribute("data-id");

    fetch(`${postsUrl}/comments/${commentId}`)
      .then(res => res.json())
      .then(comment => {
        commentTextEdit.value = comment.text;

        const editCommentHandler = () => {
          let formData = new FormData();
          formData.append('text', commentTextEdit.value);
          //formData.append('_id', comment._id);

          fetch(`${postsUrl}/comments/${commentId}`, {
            method: 'PATCH',
            body: formData
          }).then(() => {
            commentPublishEdit.removeEventListener('click', editCommentHandler);
            init();
          });
        };

        commentPublishEdit.addEventListener('click', editCommentHandler);
      });
  }

  function deleteCommentListener(event) {
    if (!event.target.getAttribute("data-id") || event.target.getAttribute('for') !== 'delete-comment') {
      return;
    }

    const id = event.target.getAttribute("data-id");

    fetch(`${postsUrl}/comments/${id}`, {method: 'DELETE'})
      .then(() => init())
  }

  function publishCommentListener(event) {
    if (!event.target.getAttribute("data-id") || event.target.getAttribute('for') !== 'comment') {
      return;
    }

    const postId = event.target.getAttribute("data-id");

    const createHandler = () => {
      let formData = new FormData();
      formData.append('text', commentText.value);
      //formData.append('postId', postId);
      console.log('commentText.value: ' + commentText.value);

      fetch(`${postsUrl}/${postId}/comments`, {
        method: 'POST',
        body: formData
      }).then(() => {
        commentPublish.removeEventListener('click', createHandler);
        commentText.value = '';
        init();
      });
    };

    commentPublish.addEventListener('click', createHandler);

  }

  function createPostListener () {
    postImageCreate.setAttribute('src', 'https://via.placeholder.com/346x335.png');

    const createHandler = () => {
      let formData = new FormData();
      formData.append('text', postTextCreate.value);

      if (postAttachCreate.files[0]) {
        formData.append('picture', postAttachCreate.files[0], 'postPicture');
      } else {
        formData.append('picture', postImageCreate.getAttribute('src'));
      }

      fetch(postsUrl, {
        method: 'POST',
        body: formData
      }).then(() => {
        postPublishCreate.removeEventListener('click', createHandler);
        postTextCreate.value = '';
        postAttachCreate.value = '';
        init();
      });
    };
    postPublishCreate.addEventListener('click', createHandler);

    postAttachCreate.addEventListener('change', (event) => {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (event) => {
          postImageCreate.setAttribute('src', `${event.target.result}`);
        };
      }
    });
  }
})();
