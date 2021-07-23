const Comment = require('../models/comment.model');

class CommentController {
    async post(req, res) {
        const id = req.body.userId;

        const comment = await Comment({
            userId: id,
            content: req.body.content,
            songSlug: req.params.slug,
            date: new Date()
        })
        comment.save()
            .then(result => result)
            .catch(error => error)
        res.status(202).send(comment);
    }
}

module.exports = new CommentController();