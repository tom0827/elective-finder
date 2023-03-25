import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("uvic_electives")

    const query = req.query;
    let { term, type } = query;

    const courses = await db.collection(`${type}_electives.${term}`.toLowerCase()).find({}).toArray()
    res.status(200).json(courses)
  } catch (e) {
    res.status(200).json(e)
  }

}
