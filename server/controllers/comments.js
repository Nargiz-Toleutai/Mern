import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body

        if (!comment)
            return res.json({ message: 'Comment is empty' })

        const newComment = new Comment({ comment });
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            })
        } catch (error) {
            console.log(error)
        }

        res.json(newComment)
    } catch (error) {
        res.json({ message: 'Something went wrong.' })
    }
};

// Remove comment 
// export const removeComment = async (req, res) => {
//     try {
//         const comment = await Comment.findByIdAndDelete(req.params.id);
//         console.log({comment})

//         await Post.findByIdAndUpdate(req.userId, {
//             $pull: { comments: req.params.id }
//         })

//         res.json({ message: 'Comment was removed' })
//     } catch (error) {
//         res.json({ message: 'Что-то пошло не так.' })
//     }
// };

// Update post
// export const updateComment = async (req, res) => {
//     try {
//         const { title, text, id } = req.body;
//         const post = await Post.findById(id);

//         if (req.files) {
//             let fileName = Date.now().toString() + req.files.image.name
//             const __dirname = dirname(fileURLToPath(import.meta.url))
//             req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
//             post.imgUrl = fileName || ''
//         };

//         post.title = title;
//         post.text = text;
//         await post.save()
//         res.json(post);
//     } catch (error) {
//         res.json({ message: 'Что-то пошло не так.' })
//     }
// }