// 水庫分區資料
const RESERVOIR_REGIONS = {
    north: ["10201", "10204", "10205", "10405", "10501"],
    central: ["10601", "20101", "20201", "20202", "20501", "20502", "20503", "20509"],
    south: ["30301", "30401", "30501", "30502", "30503", "30802", "31201"]
};

// 獲取水位等級類別
function getWaterLevelClass(percentage) {
    if (percentage < 20) return 'level-low';
    if (percentage < 50) return 'level-medium';
    return 'level-high';
}

// 格式化數字
function formatNumber(num) {
    if (!num && num !== 0) return 'N/A';
    try {
        return parseFloat(num).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (e) {
        console.error('數字格式化錯誤:', e);
        return 'N/A';
    }
}

// 格式化蓄水量（根據設備尺寸簡化顯示）
function formatStorageNumber(num) {
    if (!num && num !== 0) return 'N/A';
    try {
        // 移動設備上簡化顯示
        if (window.innerWidth <= 576) {
            const value = parseFloat(num);
            if (value >= 10000) {
                return (value / 10000).toFixed(2) + '億'; 
            } else if (value >= 1000) {
                return (value / 1000).toFixed(2) + '千';
            } else {
                return value.toFixed(1);
            }
        } else {
            return parseFloat(num).toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    } catch (e) {
        console.error('蓄水量格式化錯誤:', e);
        return 'N/A';
    }
}

// 更新最後更新時間
function updateLastUpdateTime(time) {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (time) {
        const formattedTime = formatDateTime(time);
        lastUpdateElement.textContent = `更新時間: ${formattedTime}`;
    }
}

// 創建水庫卡片 - 完全重寫
function createReservoirCard(reservoir) {
    const reservoirDiv = document.createElement('div');
    reservoirDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2');
    reservoirDiv.dataset.region = getReservoirRegion(reservoir.StationNo);

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // 1. 卡片頭部 - 水庫名稱
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    
    const reservoirName = document.createElement('h2');
    reservoirName.classList.add('reservoir-name');
    reservoirName.innerHTML = `<i class="fas fa-water"></i>${RESERVOIRS_DATA[reservoir.StationNo]}`;
    
    cardHeader.appendChild(reservoirName);
    cardDiv.appendChild(cardHeader);

    // 2. 百分比圓形區域
    const percentageContainer = document.createElement('div');
    percentageContainer.classList.add('percentage-container');
    
    const circle = document.createElement('div');
    circle.classList.add('circle');
    
    // 水位條
    const percentage = parseFloat(reservoir.PercentageOfStorage) || 0;
    const waterLevel = document.createElement('div');
    waterLevel.classList.add('water-level');
    
    // 設置水位顏色
    waterLevel.classList.add(getWaterLevelClass(percentage));
    
    // 設置水位高度
    waterLevel.style.height = `${percentage}%`;
    
    // 百分比文字
    const percentageText = document.createElement('div');
    percentageText.classList.add('percentage-text');
    percentageText.textContent = `${formatNumber(percentage)}%`;
    
    circle.appendChild(waterLevel);
    circle.appendChild(percentageText);
    percentageContainer.appendChild(circle);
    cardDiv.appendChild(percentageContainer);

    // 3. 底部信息區域
    const infoArea = document.createElement('div');
    infoArea.classList.add('info-area');
    
    // 有效蓄水量 - 使用新的格式化函數
    const infoLine1 = document.createElement('div');
    infoLine1.classList.add('info-line');
    
    // 根據屏幕大小決定顯示格式
    let storageText = '';
    if (window.innerWidth <= 576) {
        storageText = `${formatStorageNumber(reservoir.EffectiveStorage)}萬方`;
    } else if (window.innerWidth <= 768) {
        storageText = `${formatStorageNumber(reservoir.EffectiveStorage)}萬方`;
    } else if (window.innerWidth <= 1200) {
        storageText = `${formatStorageNumber(reservoir.EffectiveStorage)}萬方`;
    } else {
        storageText = `${formatStorageNumber(reservoir.EffectiveStorage)} 萬立方公尺`;
    }
    
    infoLine1.innerHTML = `
        <div class="line-icon"><i class="fas fa-tint"></i></div>
        <div class="line-label">有效蓄水量:</div>
        <div class="line-value">${storageText}</div>
    `;
    infoArea.appendChild(infoLine1);
    
    // 蓄水百分比
    const infoLine2 = document.createElement('div');
    infoLine2.classList.add('info-line');
    infoLine2.innerHTML = `
        <div class="line-icon"><i class="fas fa-percentage"></i></div>
        <div class="line-label">蓄水百分比:</div>
        <div class="line-value">${formatNumber(reservoir.PercentageOfStorage)} %</div>
    `;
    infoArea.appendChild(infoLine2);
    
    // 更新時間
    const infoLine3 = document.createElement('div');
    infoLine3.classList.add('info-line');
    infoLine3.innerHTML = `
        <div class="line-icon"><i class="far fa-clock"></i></div>
        <div class="line-label">更新時間:</div>
        <div class="line-value">${formatDateTime(reservoir.Time)}</div>
    `;
    infoArea.appendChild(infoLine3);
    
    cardDiv.appendChild(infoArea);
    reservoirDiv.appendChild(cardDiv);
    
    return reservoirDiv;
}

// 簡化日期時間格式化
function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return 'N/A';
    
    try {
        const date = new Date(dateTimeStr);
        if (isNaN(date.getTime())) return dateTimeStr;
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        // 檢測設備寬度，如果是移動設備則使用更簡短的格式
        if (window.innerWidth <= 576) {
            // 極簡格式，僅顯示月/日 時間
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${month}/${day} ${hours}:${minutes}`;
        } else if (window.innerWidth <= 768) {
            // 中等尺寸設備的格式 (省略秒數)
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${month}/${day} ${hours}:${minutes}`;
        } else {
            // 大屏幕使用正常格式
            const hours = date.getHours();
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${year}/${month}/${day} ${hours}:${minutes}`;
        }
    } catch (e) {
        console.error('日期格式化錯誤:', e);
        return dateTimeStr;
    }
}

// 獲取水庫所屬區域
function getReservoirRegion(stationNo) {
    if (RESERVOIR_REGIONS.north.includes(stationNo)) return 'north';
    if (RESERVOIR_REGIONS.central.includes(stationNo)) return 'central';
    if (RESERVOIR_REGIONS.south.includes(stationNo)) return 'south';
    return 'other';
}

// 過濾水庫顯示
function filterReservoirs(region) {
    const reservoirs = document.querySelectorAll('#reservoirs > div');
    if (region === 'all') {
        reservoirs.forEach(reservoir => {
            reservoir.style.display = 'block';
        });
    } else {
        reservoirs.forEach(reservoir => {
            if (reservoir.dataset.region === region) {
                reservoir.style.display = 'block';
            } else {
                reservoir.style.display = 'none';
            }
        });
    }
    
    // 更新按鈕狀態
    document.querySelectorAll('.region-btn').forEach(btn => {
        if (btn.dataset.region === region) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 獲取並顯示水庫數據
function fetchAndDisplayData() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'col-12 text-center my-5';
    loadingElement.innerHTML = '<p><i class="fas fa-spinner fa-spin mr-2"></i>正在載入水庫資料...</p>';
    
    const reservoirsDiv = document.getElementById('reservoirs');
    reservoirsDiv.innerHTML = '';
    reservoirsDiv.appendChild(loadingElement);

    fetch('https://fhy.wra.gov.tw/WraApi/v1/Reservoir/RealTimeInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('網路請求失敗');
            }
            return response.json();
        })
        .then(data => {
            reservoirsDiv.innerHTML = '';
            
            // 更新最後更新時間
            if (data.length > 0) {
                updateLastUpdateTime(data[0].Time);
            }

            // 創建並添加所有水庫卡片
            data.forEach(reservoir => {
                if (!(reservoir.StationNo in RESERVOIRS_DATA)) {
                    return;
                }
                
                const card = createReservoirCard(reservoir);
                reservoirsDiv.appendChild(card);
            });
            
            // 默認顯示所有水庫
            filterReservoirs('all');
        })
        .catch(error => {
            console.error('發生錯誤:', error);
            reservoirsDiv.innerHTML = '<div class="col-12 text-center"><p class="text-danger"><i class="fas fa-exclamation-triangle mr-2"></i>發生錯誤，請稍後重試。</p></div>';
        });
}

// 添加事件監聽器
document.addEventListener('DOMContentLoaded', function() {
    // 區域過濾按鈕事件
    document.querySelectorAll('.region-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterReservoirs(this.dataset.region);
        });
    });
    
    // 頁面加載時獲取數據
    fetchAndDisplayData();
    
    // 添加自動刷新
    setInterval(fetchAndDisplayData, 300000); // 每5分鐘更新一次數據
    
    // 處理窗口大小變化
    window.addEventListener('resize', function() {
        // 在窗口大小改變時重新獲取數據以更新日期時間格式
        fetchAndDisplayData();
    });
}); 