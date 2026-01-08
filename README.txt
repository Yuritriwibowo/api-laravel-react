Admin login : http://localhost:5173/admin/login
admin@gmail.com
admin123
database : laravel

register : http://127.0.0.1:8000/api/register ( POST )
{
  "name": "User Test",
  "email": "user@test.com",
  "password": "123456"
}

Login : http://127.0.0.1:8000/api/login ( POST )
{
  "email": "user@test.com",
  "password": "123456"
}

List Produk : http://127.0.0.1:8000/api/products ( GET ) 

Tambah Produk Keranjang :
http://127.0.0.1:8000/api/cart ( POST )
{
  "product_id": 1,
  "qty": 1
}

Melihat Produk Keranjang :
http://127.0.0.1:8000/api/cart ( GET )

Update Produk : http://127.0.0.1:8000/api/cart/... ( Id Keranjang ) ( PUT )
{
  "qty": 3
}

Deelte Produk : http://127.0.0.1:8000/api/cart/... ( Id Keranjang ) ( Delete )

