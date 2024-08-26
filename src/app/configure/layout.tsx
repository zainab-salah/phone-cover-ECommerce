import MaxWidthWrapper from "@/components/MaxWidthWrapper"

 
const Layout = ({children}:{
    children: React.ReactNode
}) => {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">{children}</MaxWidthWrapper>
  )
}

export default Layout