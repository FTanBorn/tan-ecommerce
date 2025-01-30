# tan-ecommerce

Bu proje, bir e-ticaret case'i için Next.js 14 kullanılarak geliştirilmiş örnek bir uygulamadır.

## Kullanılan Teknolojiler

- Next.js 14
- TypeScript
- Tailwind CSS
- Context API
- Headless UI

## Özellikler

- Ürün listeleme ve filtreleme
- Ürün arama
- Sepet yönetimi
- Responsive tasarım
- Sonsuz scroll
- Stok kontrolü

## Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/FTanBorn/tan-ecommerce.git
cd tan-ecommerce
```

2. Bağımlılıkları yükleyin:

```bash
yarn install
```

3. `.env` dosyası oluşturun ve API URL'ini ekleyin, Apiyi kendi backendimden çekiyorum filtreleme işlemleri için kullandım onun linki için 
Backend (https://github.com/FTanBorn/yemekNotum)

```env
NEXT_PUBLIC_API_URL=https://furkantandoganapi.vercel.app/api
```

4. Projeyi başlatın:

```bash
yarn dev
```

5. Tarayıcıda açın:

```
http://localhost:3000
```

## Proje Yapısı

```
src/
├── app/              # Sayfalar
├── components/       # Bileşenler
├── contexts/         # Context tanımları
├── hooks/           # Custom hooks
└── types/           # TypeScript tipleri
```

## Geliştirici

GitHub: [FTanBorn](https://github.com/FTanBorn)
