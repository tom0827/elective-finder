import clientPromise from '@/lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db("uvic_electives")

    const courses = await db.collection("technical_electives.202305").find({}).toArray()
    res.status(200).json(courses)
  } catch (e) {
    res.status(200).json(e)
  }

}
