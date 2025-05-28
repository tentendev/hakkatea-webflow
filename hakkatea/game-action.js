// 全域變數
let teaType = null;
let capType = null;
let audio = null;
let musicEnabled = true; // 預設開啟音樂播放

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化音訊
    try {
        audio = new Audio();
        audio.src = 'music.m4a';
        audio.loop = true;
        
        // 加入錯誤處理
        audio.addEventListener('error', function(e) {
            console.warn('音訊載入失敗，遊戲將繼續但沒有音效');
            audio = null;
        });

        // 設定音樂初始狀態為不播放
        audio.autoplay = false;

    } catch (e) {
        console.warn('音訊初始化失敗，遊戲將繼續但沒有音效');
        audio = null;
    }

    // 初始化步驟1
    initStep1();
});

// 步驟1的初始化
function initStep1() {
    const step1Elements = document.querySelectorAll('[data-name^="1-"]');
    // hide logo2
    document.querySelector('[data-name="logo2"]').style.display = 'none';
    step1Elements.forEach(element => {
        element.addEventListener('click', handleStep1Click);
    });
}

// 處理步驟1的點擊事件
function handleStep1Click(event) {
    const clickedElement = event.target;
    const elementName = clickedElement.getAttribute('data-name');

    if (elementName === '1-5') {
        // 隱藏1-6並設定音樂狀態為開啟
        clickedElement.style.display = 'none';
        // 設定音樂狀態為關閉並暫停播放
        musicEnabled = false;
        if (audio) {
            audio.pause();
        }
    } else if (elementName === '1-6') {
        // 顯示1-6元素
        document.querySelector('[data-name="1-5"]').style.display = 'block';
        musicEnabled = true;
        
        // 如果音訊存在且狀態為開啟，則播放音樂
        if (audio && musicEnabled) {
            audio.play().catch(() => {
                console.warn('音訊播放失敗，遊戲將繼續但沒有音效');
            });
        }
    } else if (elementName === '1-4') {
        // 隱藏step-1，顯示step-2
        document.querySelector('[data-name="step-1"]').style.display = 'none';
        document.querySelector('[data-name="step-2-background"]').style.display = 'block';
        document.querySelector('[data-name="step-2-item"]').style.display = 'block';
        
        // 根據音樂狀態決定是否播放音樂
        if (audio) {
            if (musicEnabled) {
                audio.play().catch(() => {
                    console.warn('音訊播放失敗，遊戲將繼續但沒有音效');
                });
            } else {
                // 確保音樂處於暫停狀態
                audio.pause();
            }
        }
        
        // hide logo1
        document.querySelector('[data-name="logo1"]').style.display = 'none';
        // show logo2
        document.querySelector('[data-name="logo2"]').style.display = 'block';
        // 初始化步驟2
        setTimeout(initStep2, 300);
    }
}

// 初始化步驟2
function initStep2() {
    const step2Select = document.querySelector('[data-name="step-2-0-select"]');
    step2Select.style.display = 'block';

    // 綁定茶葉選擇事件
    // const teaOptions = document.querySelectorAll('[data-name^="2-0-"]');
    // teaOptions.forEach(option => {
    //     option.addEventListener('click', handleTeaSelection);
    // });

    // 綁定201-205的點擊事件
    for (let i = 201; i <= 205; i++) {
        const element = document.querySelector(`[data-name="${i}"]`);
        if (element) {
            element.addEventListener('click', handleTeaButtonClick);
        }
    }
	document.querySelector(`[data-name="2-0-21"]`).addEventListener('click', handleTeaButtonClick);
	document.querySelector(`[data-name="2-0-8"]`).addEventListener('click', handleTeaButtonClick);
	document.querySelector(`[data-name="2-0-9"]`).addEventListener('click', handleTeaButtonClick);
	document.querySelector(`[data-name="2-0-6"]`).addEventListener('click', handleTeaButtonClick);
	document.querySelector(`[data-name="2-0-7"]`).addEventListener('click', handleTeaButtonClick);
}

// 處理201-205的點擊事件
function handleTeaButtonClick(event) {
    const clickedButton = event.target.getAttribute('data-name');
    const resultDiv = document.querySelector('[data-name="step-2-selected-result"]');
    resultDiv.style.display = 'block';

    // 先隱藏所有結果圖片（211-220）
    for (let i = 211; i <= 220; i++) {
        const element = document.querySelector(`[data-name="s${i}"]`);
        if (element) {
            element.style.display = 'none';
        }
    }

    // 根據按鈕顯示對應結果
    switch(clickedButton) {
        case '201': // 雪美人
		case '2-0-21':
            teaType = 'A';
            showTeaResult(['s215', 's216']);
            break;
        case '202': // 客家擂茶
		case '2-0-8':
            teaType = 'B';
            showTeaResult(['s219', 's220']);
            break;
        case '205': // 陶映紅茶
		case '2-0-9':
            teaType = 'C';
            showTeaResult(['s213', 's214']);
            break;
        case '204': // 龍泉茶
		case '2-0-6':
            teaType = 'D';
            showTeaResult(['s211', 's212']);
            break;
        case '203': // 東方美人茶
		case '2-0-7':
            teaType = 'E';
            showTeaResult(['s217', 's218']);
            break;
    }

    // 綁定確認和取消按鈕
    document.querySelector('[data-name="2-1-2"]').addEventListener('click', handleTeaCancel);
    document.querySelector('[data-name="2-1-4"]').addEventListener('click', handleTeaConfirm);
}


// 顯示茶葉選擇結果
function showTeaResult(showIds) {
    // hide 2-0-0
    document.querySelector('[data-name="2-0-0"]').style.display = 'none';
    // 先隱藏所有結果
    const allResults = ['s211', 's212', 's213', 's214', 's215', 's216', 's217', 's218', 's219', 's220'];
    allResults.forEach(id => {
        const element = document.querySelector(`[data-name="${id}"]`);
        if (element) {
            element.style.display = 'none';
        }
    });

    // 再顯示選擇的結果
    showIds.forEach(id => {
        const element = document.querySelector(`[data-name="${id}"]`);
        if (element) {
            element.style.display = 'block';
        }
    });
}

// 處理茶葉取消
function handleTeaCancel() {
    // show 2-0-0
    document.querySelector('[data-name="2-0-0"]').style.display = 'block';
    const resultDiv = document.querySelector('[data-name="step-2-selected-result"]');
    resultDiv.style.display = 'none';

    // 隱藏所有結果圖片（211-220）
    for (let i = 211; i <= 220; i++) {
        const element = document.querySelector(`[data-name="${i}"]`);
        if (element) {
            element.style.display = 'none';
        }
    }
}

// 處理茶葉確認
function handleTeaConfirm() {
    const resultDiv = document.querySelector('[data-name="step-2-selected-result"]');
    const selectDiv = document.querySelector('[data-name="step-2-0-select"]');
    const step2Item = document.querySelector('[data-name="step-2-item"]');
    const step3Item = document.querySelector('[data-name="step-3-item"]');

    resultDiv.style.display = 'none';
    selectDiv.style.display = 'none';
    step2Item.style.display = 'none';
    step3Item.style.display = 'block';

    // 初始化步驟3
    setTimeout(initStep3, 300);
}

// 初始化步驟3
function initStep3() {
    const step3Select = document.querySelector('[data-name="step-3-0-select"]');
    step3Select.style.display = 'block';

    // 綁定301-304的點擊事件
    for (let i = 301; i <= 304; i++) {
        const element = document.querySelector(`[data-name="${i}"]`);
        if (element) {
            element.addEventListener('click', handleCupButtonClick);
        }
    }
	document.querySelector(`[data-name="3-0-9"]`).addEventListener('click', handleStep3Back);
}

function handleStep3Back(event){
    const step3Select = document.querySelector('[data-name="step-3-0-select"]');
    step3Select.style.display = 'none';
    const step3Item = document.querySelector('[data-name="step-3-item"]');
    step3Item.style.display = 'none';
	document.querySelector('[data-name="step-2-background"]').style.display = 'block';
	document.querySelector('[data-name="step-2-item"]').style.display = 'block';
    document.querySelector('[data-name="2-0-0"]').style.display = 'block';
	initStep2();
}

// 處理301-304的點擊事件
function handleCupButtonClick(event) {
    const clickedButton = event.target.getAttribute('data-name');
    const resultDiv = document.querySelector('[data-name="step-3-selected-result"]');
    resultDiv.style.display = 'block';

    // 先隱藏所有結果圖片（311-318）
    for (let i = 311; i <= 318; i++) {
        const element = document.querySelector(`[data-name="s${i}"]`);
        if (element) {
            element.style.display = 'none';
        }
    }

    // 根據按鈕顯示對應結果
    switch(clickedButton) {
        case '301': // 擂缽
            capType = 'A';
            showCupResult(['s311', 's312']);
            break;
        case '302': // 紫砂壺
            capType = 'B';
            showCupResult(['s313', 's314']);
            break;
        case '303': // 碗蓋
            capType = 'C';
            showCupResult(['s315', 's316']);
            break;
        case '304': // 玻璃杯
            capType = 'D';
            showCupResult(['s317', 's318']);
            break;
    }

    // 綁定確認和取消按鈕
    document.querySelector('[data-name="3-1-9"]').addEventListener('click', handleCupCancel);
    document.querySelector('[data-name="3-0-9"]').style.display = 'none';

    if( 
        (teaType == 'B' && capType == 'A') || 
        (teaType == 'A' && (capType == 'D' || capType == 'C'|| capType == 'B')) ||
        (teaType == 'C' && (capType == 'D' || capType == 'C'|| capType == 'B')) ||
        (teaType == 'D' && (capType == 'D' || capType == 'C'|| capType == 'B')) ||
        (teaType == 'E' && (capType == 'D' || capType == 'C'|| capType == 'B'))
    ) {   
        // show 3-1-11
        document.querySelector('[data-name="3-1-11"]').style.display = 'block';
        document.querySelector('[data-name="3-1-11"]').addEventListener('click', handleCupConfirm);
    }else{
        // hide 3-1-11
        document.querySelector('[data-name="3-1-10"]').style.display = 'none';
        document.querySelector('[data-name="3-1-11"]').style.display = 'none';
    }
}

// 處理茶具取消
function handleCupCancel() {
    //show 3-0-0
    document.querySelector('[data-name="3-0-0"]').style.display = 'block';
    const resultDiv = document.querySelector('[data-name="step-3-selected-result"]');
    resultDiv.style.display = 'none';

    // 隱藏所有結果圖片（311-318）
    for (let i = 311; i <= 318; i++) {
        const element = document.querySelector(`[data-name="s${i}"]`);
        if (element) {
            element.style.display = 'none';
        }
    }
    document.querySelector('[data-name="3-0-9"]').style.display = 'block';
}

// 顯示茶具選擇結果
function showCupResult(showIds) {
    //hide 3-0-0
    document.querySelector('[data-name="3-0-0"]').style.display = 'none';
    const allResults = ['s311', 's312', 's313', 's314', 's315', 's316', 's317', 's318'];
    allResults.forEach(id => {
        const element = document.querySelector(`[data-name="${id}"]`);
        if (element) {
            element.style.display = showIds.includes(id) ? 'block' : 'none';
        }
    });
}

// 處理茶具確認
function handleCupConfirm() {
    const resultDiv = document.querySelector('[data-name="step-3-selected-result"]');
    const step3Item = document.querySelector('[data-name="step-3-item"]');
    const step4Item = document.querySelector('[data-name="step-4-item"]');

    resultDiv.style.display = 'none';
    step3Item.style.display = 'none';
    step4Item.style.display = 'block';

    // 初始化步驟4
    setTimeout(initStep4, 300);
}

// 初始化步驟4
function initStep4() {
    const step4Select = document.querySelector('[data-name="step-4-select"]');
    step4Select.style.display = 'block';

    // 綁定溫度選擇事件
    document.querySelector('[data-name="401"]').addEventListener('click', handleTemperatureSelection);
	document.querySelector(`[data-name="4-0-9"]`).addEventListener('click', handleStep4Back);
}

function handleStep4Back(event){
    const step4Select = document.querySelector('[data-name="step-4-select"]');
    step4Select.style.display = 'none';
    const step4Item = document.querySelector('[data-name="step-4-item"]');
    step4Item.style.display = 'none';
    document.querySelector('[data-name="3-0-9"]').style.display = 'block';
    document.querySelector('[data-name="3-0-0"]').style.display = 'block';
	handleTeaConfirm();
	
}

// 處理溫度選擇
function handleTemperatureSelection() {
    const step4Select = document.querySelector('[data-name="step-4-select"]');
    const step41 = document.querySelector('[data-name="step-4-1"]');
    //hide 4-0-2
    document.querySelector('[data-name="4-0-2"]').style.display = 'none';
    document.querySelector('[data-name="4-0-9"]').style.display = 'none';
    step41.style.display = 'block';

    // 根據茶葉類型顯示對應的起始溫度
    let startTemp = '70c';
    switch(teaType) {
        case 'A': // 雪美人
            startTemp = '80c';
            break;
        case 'B': // 客家擂茶
            startTemp = '100c';
            break;
        case 'C': // 陶映紅茶
            startTemp = '90c';
            break;
        case 'D': // 龍泉茶
            startTemp = '85c';
            break;
        case 'E': // 東方美人茶
            startTemp = '80c';
            break;
    }
	startTemp = '70c';
    // 顯示起始溫度按鈕
    document.querySelector(`[data-name="${startTemp}"]`).style.display = 'block';

    // 綁定溫度按鈕事件
    const tempButtons = ['70c', '80c', '85c', '90c', '95c', '100c'];
    tempButtons.forEach(temp => {
        const button = document.querySelector(`[data-name="${temp}"]`);
        if (button) {
            button.addEventListener('click', handleTemperatureButton);
        }
    });

    // 綁定取消按鈕
    document.querySelector('[data-name="4-1-7"]').addEventListener('click', handleTemperatureCancel);
}

// 處理溫度按鈕
function handleTemperatureButton(event) {
    const currentTemp = event.target.getAttribute('data-name');
    const nextTemp = getNextTemperature(currentTemp);
    
    if (nextTemp) {
        // 檢查下一個溫度是否為該茶葉類型所需的溫度
        let isCorrectTemp = false;
        switch(teaType) {
            case 'A': // 雪美人
                isCorrectTemp = nextTemp === '80c';
                break;
            case 'B': // 客家擂茶
                isCorrectTemp = nextTemp === '100c';
                break;
            case 'C': // 陶映紅茶
                isCorrectTemp = nextTemp === '90c';
                break;
            case 'D': // 龍泉茶
                isCorrectTemp = nextTemp === '85c';
                break;
            case 'E': // 東方美人茶
                isCorrectTemp = nextTemp === '80c';
                break;
        }

        if (isCorrectTemp) {
            // 如果下一個溫度是正確的，直接進入下一步
            const step41 = document.querySelector('[data-name="step-4-1"]');
            const step42 = document.querySelector('[data-name="step-4-2"]');
            
            step41.style.display = 'none';
            step42.style.display = 'block';

            // 初始化步驟4-2
            initStep42();
        } else {
            // 如果下一個溫度不是正確的，顯示下一個溫度按鈕
            document.querySelector(`[data-name="${nextTemp}"]`).style.display = 'block';
            document.querySelector(`[data-name="${currentTemp}"]`).style.display = 'none';
        }
    }
}

// 獲取下一個溫度
function getNextTemperature(currentTemp) {
    const tempSequence = ['70c', '80c', '85c', '90c', '95c', '100c'];
    const currentIndex = tempSequence.indexOf(currentTemp);
    return currentIndex < tempSequence.length - 1 ? tempSequence[currentIndex + 1] : null;
}

// 處理溫度取消
function handleTemperatureCancel() {
    const step41 = document.querySelector('[data-name="step-4-1"]');
    const step4Select = document.querySelector('[data-name="step-4-select"]');
    //show 4-0-2    
    document.querySelector('[data-name="4-0-2"]').style.display = 'block';
    step41.style.display = 'none';
    step4Select.style.display = 'block';
    document.querySelector('[data-name="4-0-9"]').style.display = 'block';
}

// 初始化步驟4-2
function initStep42() {
    const step42 = document.querySelector('[data-name="step-4-2"]');
    document.querySelector('[data-name="4-2-6"]').style.display = 'none';
    document.querySelector('[data-name="4-2-7"]').style.display = 'none';
    
    // 先隱藏所有溫度圖片
    document.querySelector('[data-name="s70c"]').style.display = 'none';
    document.querySelector('[data-name="s80c"]').style.display = 'none';
    document.querySelector('[data-name="s85c"]').style.display = 'none';
    document.querySelector('[data-name="s90c"]').style.display = 'none';
    document.querySelector('[data-name="s95c"]').style.display = 'none';
    document.querySelector('[data-name="s100c"]').style.display = 'none';

    // 根據茶葉類型顯示對應的溫度圖片
    switch(teaType) {
        case 'A': // 雪美人
            document.querySelector('[data-name="s80c"]').style.display = 'block';
            break;
        case 'B': // 客家擂茶
            document.querySelector('[data-name="s100c"]').style.display = 'block';
            break;
        case 'C': // 陶映紅茶
            document.querySelector('[data-name="s90c"]').style.display = 'block';
            break;
        case 'D': // 龍泉茶
            document.querySelector('[data-name="s85c"]').style.display = 'block';
            break;
        case 'E': // 東方美人茶
            document.querySelector('[data-name="s80c"]').style.display = 'block';
            break;
    }

    // 綁定確認按鈕
    document.querySelector('[data-name="4-2-10"]').addEventListener('click', handleStep42Confirm);
}

// 處理步驟4-2確認
function handleStep42Confirm() {
    const step42 = document.querySelector('[data-name="step-4-2"]');
    const step51 = document.querySelector('[data-name="step-5-1"]');
    
    step42.style.display = 'none';
    step51.style.display = 'block';

    // 初始化步驟5
    initStep5();
}

// 初始化步驟5
function initStep5() {
    // 根據teaType顯示對應的動畫
    hideElements(['5-1-4','5-1-5','5-1-2-1', '5-1-2-2', '5-1-3-1', '5-1-3-2', '5-1-4-1', '5-1-4-2', '5-1-5-1', '5-1-5-2', '5-1-6-1', '5-1-6-2']);
    switch(teaType) {
        case 'A':
            switch(capType){
                case 'B':
                    // document.querySelector('[data-name="5-1-6-1"]').style.display = 'block';
                    showAnimation('5-1-6-1','5-1-6-2',7000, 'A-B-RUN-1.gif');
                    break;
                case 'C':
                    // document.querySelector('[data-name="5-1-6-1"]').style.display = 'block';
                    showAnimation('5-1-6-1','5-1-6-2',7000, 'A-C-RUN-1.gif');
                    break;
                case 'D':
                    // document.querySelector('[data-name="5-1-6-1"]').style.display = 'block';
                    showAnimation('5-1-6-1','5-1-6-2',7000, 'A-D-RUN-1.gif');
                    break;
            }
            break;
        case 'B':
            // document.querySelector('[data-name="5-1-5-1"]').style.display = 'block';
            showAnimation('5-1-5-1','5-1-5-2',14000, 'B-A-RUN-1.gif');
            break;
        case 'C':
            switch(capType){
                case 'B':
                    // document.querySelector('[data-name="5-1-4-1"]').style.display = 'block';
                    showAnimation('5-1-4-1','5-1-4-2',7000, 'C-B-RUN-1.gif');
                    break;
                case 'C':
                    // document.querySelector('[data-name="5-1-4-1"]').style.display = 'block';
                    showAnimation('5-1-4-1','5-1-4-2',7000, 'C-C-RUN-1.gif');
                    break;
                case 'D':
                    // document.querySelector('[data-name="5-1-4-1"]').style.display = 'block';
                    showAnimation('5-1-4-1','5-1-4-2',7000, 'C-D-RUN-1.gif');
                    break;
            }
            break;
        case 'D':
            switch(capType){
                case 'B':
                    // document.querySelector('[data-name="5-1-2-1"]').style.display = 'block';
                    showAnimation('5-1-2-1','5-1-2-2',7000, 'D-B-RUN-1.gif');
                    break;
                case 'C':
                    // document.querySelector('[data-name="5-1-2-1"]').style.display = 'block';
                    showAnimation('5-1-2-1','5-1-2-2',7000, 'D-C-RUN-1.gif');
                    break;
                case 'D':
                    // document.querySelector('[data-name="5-1-2-1"]').style.display = 'block';
                    showAnimation('5-1-2-1','5-1-2-2',7000, 'D-D-RUN-1.gif');
                    break;
            }
            break;
        case 'E':
            switch(capType){            
                case 'B':
                    // document.querySelector('[data-name="5-1-3-1"]').style.display = 'block';
                    showAnimation('5-1-3-1','5-1-3-2',7000, 'E-B-RUN-1.gif');
                    break;
                case 'C':
                    // document.querySelector('[data-name="5-1-3-1"]').style.display = 'block';
                    showAnimation('5-1-3-1','5-1-3-2',7000, 'E-C-RUN-1.gif');
                    break;
                case 'D':
                    // document.querySelector('[data-name="5-1-3-1"]').style.display = 'block';
                    showAnimation('5-1-3-1','5-1-3-2',7000, 'E-D-RUN-1.gif');
                    break;
            }
            break;
    }

    // 綁定下一步按鈕
    document.querySelector('[data-name="5-1-5"]').addEventListener('click', handleStep5Next);
}

// 隱藏元素
function hideElements(elementNames) {
    elementNames.forEach(name => {
        const element = document.querySelector(`[data-name="${name}"]`);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// 顯示動畫
function showAnimation(elementName1,elementName2,sec, gifName) {
    const element = document.querySelector(`[data-name="${elementName2}"]`);
    const frameElement = document.querySelector(`[data-name="${elementName1}"]`);
    
    if (element) {
        // 先隱藏元素
        element.style.display = 'none';
        frameElement.style.display = 'none';
        
        // 創建一個臨時圖片來載入 GIF
        const tempImg = new Image();
        tempImg.onload = function() {
            // 設置 GIF 來源
            element.src = gifName;
            element.srcset = `${gifName} 1x`;
            
            // 設置動畫屬性
            element.style.animation = 'none';
            element.style.animationPlayState = 'running';
            element.style.animationFillMode = 'forwards';
            element.style.animationIterationCount = '1';
            
            // 顯示 GIF
            element.style.display = 'block';
            
            // 設定一個計時器，在 GIF 播放完成後執行
            setTimeout(() => {
                // 暫停動畫
                element.style.animationPlayState = 'paused';
                
                // 顯示對應的框架
                frameElement.style.display = 'block';
                // 顯示 5-1-4
                document.querySelector('[data-name="5-1-4"]').style.display = 'block';
                // 顯示 5-1-5
                document.querySelector('[data-name="5-1-5"]').style.display = 'block';
            }, sec);
        };
        
        // 開始載入 GIF
        tempImg.src = gifName;
    }
}

// 處理步驟5下一步
function handleStep5Next() {
    const step51 = document.querySelector('[data-name="step-5-1"]');
    const step61 = document.querySelector('[data-name="step-6-1"]');
    
    step51.style.display = 'none';
    step61.style.display = 'block';

    // 初始化步驟6
    initStep6();
}

// 初始化步驟6
function initStep6() {
    // 綁定按鈕事件
    document.querySelector('[data-name="6-1-6"]').addEventListener('click', handleStep6Next);
    document.querySelector('[data-name="6-1-5"]').addEventListener('click', handleStep6Next);
    // hide 6-1-2-1, 6-1-2-2, 6-1-2-3, 6-1-2-4, 6-1-2-5, 6-1-2-6
    hideElements(['6-1-2-1', '6-1-2-2', '6-1-2-3', '6-1-2-4', '6-1-2-5', '6-1-2-6']);


    switch(teaType){
        case 'A':
            // show 6-1-2-3
            document.querySelector('[data-name="6-1-2-3"]').style.display = 'block';
            break;
        case 'B':
            // show 6-1-2-4
            document.querySelector('[data-name="6-1-2-4"]').style.display = 'block';
            break;
        case 'C':
            // show 6-1-2-2
            document.querySelector('[data-name="6-1-2-2"]').style.display = 'block';
            break;
        case 'D':
            // show 6-1-2-5
            document.querySelector('[data-name="6-1-2-5"]').style.display = 'block';
            break;
        case 'E':
            // show 6-1-2-1
            document.querySelector('[data-name="6-1-2-1"]').style.display = 'block';
            break;
    }

    document.querySelector('[data-name="6-1-2-1"]').addEventListener('click', function() {
        window.open('https://www.facebook.com/p/%E9%BE%8D%E6%BD%AD%E5%8D%80%E8%BE%B2%E6%9C%83%E8%BE%B2%E6%B0%91%E7%9B%B4%E9%8A%B7%E7%AB%99-100057450699544/?locale=zh_TW', '_blank');
    }); 
    document.querySelector('[data-name="6-1-2-2"]').addEventListener('click', function() {
        window.open('https://www.facebook.com/p/%E9%BE%8D%E6%BD%AD%E5%8D%80%E8%BE%B2%E6%9C%83%E8%BE%B2%E6%B0%91%E7%9B%B4%E9%8A%B7%E7%AB%99-100057450699544/?locale=zh_TW', '_blank');
    }); 
    document.querySelector('[data-name="6-1-2-3"]').addEventListener('click', function() {
        window.open('https://www.facebook.com/p/%E9%BE%8D%E6%BD%AD%E5%8D%80%E8%BE%B2%E6%9C%83%E8%BE%B2%E6%B0%91%E7%9B%B4%E9%8A%B7%E7%AB%99-100057450699544/?locale=zh_TW', '_blank');
    }); 
    document.querySelector('[data-name="6-1-2-5"]').addEventListener('click', function() {
        window.open('https://www.facebook.com/p/%E9%BE%8D%E6%BD%AD%E5%8D%80%E8%BE%B2%E6%9C%83%E8%BE%B2%E6%B0%91%E7%9B%B4%E9%8A%B7%E7%AB%99-100057450699544/?locale=zh_TW', '_blank');
    }); 
    

    document.querySelector('[data-name="6-1-2-4"]').addEventListener('click', function() {
        window.open('https://www.hakkatea.tw/', '_blank');
    });
}

// 處理步驟6下一步
function handleStep6Next() {
    const step61 = document.querySelector('[data-name="step-6-1"]');
    const step71 = document.querySelector('[data-name="step-7-1"]');
    
    step61.style.display = 'none';
    step71.style.display = 'block';

    // 初始化步驟7
    initStep7();
}

// 初始化步驟7
function initStep7() {
    // 綁定重新開始按鈕
    document.querySelector('[data-name="7-0-2"]').addEventListener('click', handleRestartGame);
    // 綁定分享按鈕
    document.querySelector('[data-name="7-0-3"]').addEventListener('click', handleShareToFacebook);

    // click 7-0-8 開新頁 https://kiung-ha-loi-siid-liung-tam-ca.webflow.io/
    document.querySelector('[data-name="7-0-8"]').addEventListener('click', function() {
        window.open('https://urli.ai/SySgY0P5', '_blank');
    });
}

function initStep8() {
    //show step-8-1
    document.querySelector('[data-name="step-8-1"]').style.display = 'block';
    // click step-8-uncheck and hide step-8-uncheck , show step-8-next
    document.querySelector('[data-name="step-8-next"]').style.display = 'none';
    document.querySelector('[data-name="step-8-uncheck"]').style.display = 'block';

    document.querySelector('[data-name="step-8-uncheck"]').addEventListener('click', function() {
        document.querySelector('[data-name="step-8-uncheck"]').style.display = 'none';
        document.querySelector('[data-name="step-8-next"]').style.display = 'block';
    });
    
    document.querySelector('[data-name="step-8-next"]').addEventListener('click', handleStep8Next);
}

// 處理step-8-next
function handleStep8Next() {
    // hide step-8-1
    // show step-8-2
    document.querySelector('[data-name="step-8-1"]').style.display = 'none';
    document.querySelector('[data-name="step-8-2"]').style.display = 'block';
    // click step-8-2-next
    document.querySelector('[data-name="step-8-2-next"]').addEventListener('click', handleStep8Next2);
}

// 處理step-8-next2
function handleStep8Next2() {
    // hide step-8-2
    document.querySelector('[data-name="step-8-2"]').style.display = 'none';
    // show step-8-3
    document.querySelector('[data-name="step-8-3"]').style.display = 'block';

    //click step-8-3-next , hide step-8-3
    document.querySelector('[data-name="step-8-3-next"]').addEventListener('click', function() {
        document.querySelector('[data-name="step-8-3"]').style.display = 'none';
    });
}

// 處理重新開始遊戲
function handleRestartGame() {
    // 直接重新整理頁面
    window.location.reload();
}

function handleShareToFacebook() {
    const shareUrl = "https://urli.ai/MoqPPXEv";

    // 判斷是否支援 Web Share API（行動裝置瀏覽器）
    if (navigator.share) {
        navigator.share({
            title: "龍潭茶席遊戲",
            text: "來體驗龍潭茶席的樂趣！",
            url: shareUrl
        })
        .then(() => {
            console.log("分享成功");
        })
        .catch((error) => {
            console.error("分享失敗:", error);
        });
    } else {
        // 不支援時 fallback 為 Facebook 網頁分享
        const fallbackUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(fallbackUrl, '_blank', 'width=600,height=400');
    }
}


// 裝置方向相關功能
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function checkOrientation() {
    const warning = document.getElementById('orientation-warning');
    if (isMobile() && window.innerHeight > window.innerWidth) {
        warning.style.display = 'flex';
        document.getElementById('game').style.visibility = 'hidden';
    } else {
        warning.style.display = 'none';
        document.getElementById('game').style.visibility = 'visible';
    }
}

// 監聽方向變化
window.addEventListener('load', function() {
    checkOrientation();
    window.addEventListener('orientationchange', function() {
        setTimeout(checkOrientation, 200); // 延遲執行，等待方向變化完成
    });
    window.addEventListener('resize', checkOrientation);
}); 