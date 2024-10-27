import { getProductsList, getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

type HeroProps = {
  countryCode: string
}

const Hero = async ({ countryCode }: HeroProps) => {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await getProductsList({
    pageParam: 0,
    queryParams: {
      limit: 3,
    },
    countryCode,
  })

  return (
    <div>
      <div className="w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
        <div className="inset-0 z-10 flex flex-col justify-center items-center text-center small:p-24 gap-6">
          <span>
            <Heading
              level="h1"
              className="text-5xl leading-10 text-ui-fg-base font-normal mb-5"
            >
              Better clothing for the planet
            </Heading>
            <Text className="font-light">
              Create screens directly in Method or add your images from Sketch
              or Figma. You can even sync designs from your cloud storage!
            </Text>
          </span>

          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/store"
            data-testid="nav-account-link"
          >
            <Button variant="secondary" size="xlarge">
              Shop All
            </Button>
          </LocalizedClientLink>
        </div>
        <div className="flex justify-center mb-32">
          <ul
            className="md:w-[60%] mx-5 flex gap-5"
            data-testid="products-list"
          >
            {products.map((p) => {
              return (
                <li key={p.id} className="flex-1">
                  <ProductPreview product={p} region={region} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Hero
