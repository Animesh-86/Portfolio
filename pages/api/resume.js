import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), 'Animesh_Sharma_Resume.pdf')
    const stat = fs.statSync(filePath)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Length', stat.size)
    res.setHeader('Content-Disposition', 'attachment; filename="Animesh_Sharma_Resume.pdf"')
    const stream = fs.createReadStream(filePath)
    stream.pipe(res)
  } catch (err) {
    res.status(404).json({ error: 'Resume not found. Please place your resume at the repository root named Animesh_Sharma_Resume.pdf or move it to /public and link directly.' })
  }
}
