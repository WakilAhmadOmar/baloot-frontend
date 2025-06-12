import { defaultLocale, locales } from "../config/locales"
import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales,
  defaultLocale,
  localeDetection: false,
})

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
