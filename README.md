# 📱 Dự án React Native (TypeScript)

Đây là một dự án React Native được khởi tạo bằng [`@react-native-community/cli`](https://github.com/react-native-community/cli), sử dụng TypeScript và sẵn sàng để mở rộng.

---

## 🔧 Thông tin dự án

- ⚛️ **React Native**: mobile framework đa nền tảng
- 🟦 **TypeScript**: hỗ trợ kiểm tra kiểu tĩnh và phát triển dễ bảo trì
- 📁 Cấu trúc mã hóa rõ ràng, tách riêng `components`, `screens`, `navigation`, v.v.

---

## 🚀 Bắt đầu

> 💡 **Lưu ý:** Trước khi chạy dự án, bạn cần hoàn tất phần [Cài đặt môi trường React Native chính thức](https://reactnative.dev/docs/environment-setup).

### 1. Tải mã nguồn

```bash
git clone <link-repo-của-bạn>
cd MyApp
```

### 2. Cài đặt dependencies
   
```bash
# Sử dụng npm
npm install

# Hoặc Yarn
yarn
```

### 3. Cài CocoaPods (nếu dùng macOS để chạy iOS)
```bash
cd ios
bundle install           # Chỉ lần đầu
bundle exec pod install
cd ..
```

### 4. Khởi động Metro bundler
```bash
npm start
# hoặc
yarn start
```

### 5. Chạy ứng dụng ▶️ Android (Windows/macOS/Linux đều được)
```bash
npm run android
# hoặc
yarn android
```

### 🍏 iOS (chỉ chạy trên macOS)
```bash
npm run ios
# hoặc
yarn ios
```
