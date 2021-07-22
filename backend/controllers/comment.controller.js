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
            .then(() => {
                return res.status(200).send('success');
            })
            .catch(error => {
                return res.status(500).send(error);
            })
    }
}

module.exports = new CommentController();