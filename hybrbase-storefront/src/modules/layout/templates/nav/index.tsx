import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { ShoppingBag } from "@medusajs/icons"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import { Input } from "@medusajs/ui"

const SideMenuItems = {
  Store: "/store",
  About: "/about",
}

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular gap-2">
          <div className="flex items-center h-full gap-2 md:gap-7 w-full">
            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                Hybrbase
              </LocalizedClientLink>
            </div>
            {Object.entries(SideMenuItems).map(([name, href]) => {
              return (
                <LocalizedClientLink
                  href={href}
                  className="text-sm leading-10 hover:text-ui-fg-disabled"
                  data-testid={`${name.toLowerCase()}-link`}
                  key={name}
                >
                  {name}
                </LocalizedClientLink>
              )
            })}
            <div className="max-w-[350px] w-full">
              <Input placeholder="Search" id="search-input" type="search" />
            </div>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <ShoppingBag />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {/* {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )} */}
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
