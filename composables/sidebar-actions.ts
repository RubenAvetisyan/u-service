/* eslint-disable no-console */
function toggle(el: Element, ...classNames: string[]) {
  // eslint-disable-next-line no-undef
  if (!el)
    throwError(`value of property "el" is "${el}"`)
  classNames.forEach(className => el.classList.toggle(className))
  //
}

export function useSidebarToggle() {
  const sidebarNavWrapper = document.querySelector('.sidebar-wrapper')
  const sidebarContent = document.getElementById('sidebar-content')
  const sidebarNav = document.querySelector('.sidebar')

  if (sidebarNavWrapper && sidebarContent && sidebarNav) {
    toggle(sidebarNavWrapper, 'md:invisible', 'z-50')
    toggle(sidebarNav, 'absolute', 'relative', 'translate-x-full', 'translate-x-0', 'backdrop-blur-0', 'bg-opacity-0', 'backdrop-blur-sm', 'bg-opacity-35')
    toggle(sidebarContent, 'bg-white', 'backdrop-blur-0', 'bg-opacity-0', 'backdrop-blur-sm', 'bg-black', 'bg-opacity-35')
  }
}
