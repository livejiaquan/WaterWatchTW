# 台灣水庫即時水情 Taiwan Reservoir Monitor

![台灣水庫即時水情](screenshots/preview.png)

## 專案簡介 Project Overview

「台灣水庫即時水情」是一個視覺化呈現台灣主要水庫即時蓄水情況的網頁應用。透過直觀的界面設計，使用者可以快速了解全台各大水庫的蓄水量、蓄水百分比等關鍵資訊，並可依照北、中、南區域進行篩選查看。

Taiwan Reservoir Monitor is a web application that visualizes real-time water storage information of major reservoirs in Taiwan. Through an intuitive interface design, users can quickly understand key information such as water storage volume and percentage of major reservoirs across Taiwan, with filtering options for northern, central, and southern regions.

## 功能特色 Features

- 即時顯示台灣主要水庫蓄水情況
- 視覺化水位百分比展示
- 依照地區篩選水庫（北部、中部、南部）
- 自動每5分鐘更新資料
- 完全響應式設計，支援各種裝置瀏覽
- 簡潔直觀的使用者界面

---

- Real-time display of water storage status for major reservoirs in Taiwan
- Visual representation of water level percentages
- Regional filtering of reservoirs (Northern, Central, Southern)
- Automatic data updates every 5 minutes
- Fully responsive design supporting various devices
- Clean and intuitive user interface

## 技術實現 Technologies

- HTML5 / CSS3
- JavaScript (ES6+)
- Bootstrap 4
- D3.js (資料視覺化)
- 經濟部水利署開放資料 API

## 資料來源 Data Source

本專案使用經濟部水利署提供的開放資料 API：
This project uses open data API provided by the Water Resources Agency, Ministry of Economic Affairs, Taiwan:

- API 端點 (Endpoint): https://fhy.wra.gov.tw/WraApi/v1/Reservoir/RealTimeInfo

## 本地運行 Local Development

1. 克隆此專案 (Clone this repository)
   ```
   git clone https://github.com/livejiaquan/WaterWatchTW.git
   ```

2. 使用瀏覽器開啟 index.html 檔案，或使用本地伺服器運行
   Open index.html in your browser or use a local server

## 線上展示 Live Demo

[https://livejiaquan.github.io/WaterWatchTW](https://livejiaquan.github.io/WaterWatchTW)

## 授權 License

本專案採用 MIT 授權條款 - 詳情請參閱 [LICENSE](LICENSE) 檔案
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 貢獻 Contributing

歡迎提交 Issue 或 Pull Request 來協助改進此專案。
Issues and Pull Requests are welcome to help improve this project.

## 聯絡方式 Contact

- 作者 (Author): LimJiaQuan
- Email: livejiaquan@gmail.com
- GitHub: [livejiaquan](https://github.com/livejiaquan)

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.idea/
.vscode/
*.sublime-project
*.sublime-workspace

# Logs
logs
*.log
npm-debug.log* 