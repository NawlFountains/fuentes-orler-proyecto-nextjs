import { lusitana } from '@/app/ui/fonts';

export default function StoreLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[44px] text-white">Shop</p>
    </div>
  );
}
