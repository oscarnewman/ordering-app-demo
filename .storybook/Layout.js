import '../src/styles/tailwind.css'

const Layout = ({ children }) => {
  return (
    <div className="p-6">
      {children}
    </div>
  )
}

export default Layout
