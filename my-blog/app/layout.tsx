import MyProfile from './components/MyProfile'
import Navbar from './components/Navbar'
import './globals.css'


export const metadata = {
  title: 'Jam\'s Blog',
  description: "Created by Jam's Blog  "
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <MyProfile/>
        {children}</body>
    </html>
  )
}
