"use client"

import Image from "next/image"
import { useParams } from "next/navigation"

export const Search = () => {
    // const [posts, setPosts] = useState<any[]>([])
    // const [loading, setLoading] = useState(true)

    // useEffect(() => {

    // }, [])

    const getParams = useParams()
    const slug = getParams.category

    return(
        <nav className="search">
            <Image src="/search.png" className="search-img" width={25} height={25} alt="" />
            <input type="text" className="search-input" placeholder="Введіть назву" />
            {/* <ul className="search__list">
                {
                    products.filter((product) => slug ? product.categorySlug === slug : true).map(product => 
                        <li key={product.slug}>
                            <Link className="search__list-link" href={"/product/" + product.slug}>{product.name}</Link>
                        </li>
                    )
                }
            </ul> */}
        </nav>
    )
}