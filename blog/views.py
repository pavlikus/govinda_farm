from flask import Blueprint
from flask import abort
from flask import render_template

from .models import Post

blog = Blueprint('blog', __name__)


@blog.route('/')
def index():

    posts = Post.query.order_by(Post.date_created.desc())
    return render_template('blog/index.html',
                           posts=posts,
                           name='blog')


@blog.route('/<slug>/')
def post(slug):

    post = Post.query.filter(Post.slug == slug).first()
    if post is None:
        abort(404)
    return render_template(f"blog/post.html",
                           post=post,
                           name='post')
