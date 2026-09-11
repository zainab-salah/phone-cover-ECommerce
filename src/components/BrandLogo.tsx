export default function BrandLogo() {
  return <span className='brand-logo' aria-hidden='true'>
    <span className='brand-logo-name'>BSMA</span>
    <span className='brand-logo-signature'>
      <svg className='brand-logo-moon' viewBox='0 0 34 28' fill='currentColor'>
        <path d='M20.9 13.2A9 9 0 0 1 10.8 3.1 9 9 0 1 0 20.9 13.2Z' />
        <path d='m27 2 1.2 3.8L32 7l-3.8 1.2L27 12l-1.2-3.8L22 7l3.8-1.2Z' />
        <path d='m28 17 .8 2.2L31 20l-2.2.8L28 23l-.8-2.2L25 20l2.2-.8Z' />
      </svg>
      <span className='brand-logo-art'>art</span>
    </span>
  </span>
}
