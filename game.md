每一個step 是一個階段 , 元件以 data-name 為名稱抓取
全域變數:
    teaType: A(雪美人) , B(客家擂茶) , C(陶映紅茶) , D(龍泉茶) , E(東方美人茶)
    capType: A(擂缽) , B(紫砂壺) , C(碗蓋) , D(玻璃杯)


1. step-1 :
    click 1-6 , 1-6 隱藏 並撥放音樂 muisc.m4a(循環播放)
    click 1-5 , 1-6 顯示 並停止音樂
    click 1-4 , 隱藏 step-1 , 顯示 step-2-background,step-2-item

2. step-2-item:
    顯示後 delay 1 秒 , 顯示step-2-0-select
    click 201 (紀錄teaType A) :
        顯示 setp-2-selected-result :
            顯示 215,216            
            隱藏 211,212,213,214,217,218,219,220
    click 202 (紀錄teaType B)
        顯示 setp-2-selected-result :
            顯示 219,220            
            隱藏 211,212,213,214,215,216,217,218
    click 203 (紀錄teaType C)
        顯示 setp-2-selected-result :
            顯示 213,214      
            隱藏 211,212,215,216,217,218,219,220
    click 204 (紀錄teaType D)
        顯示 setp-2-selected-result :
            顯示 211,212            
            隱藏 213,214,215,216,217,218,219,220
    click 205 (紀錄teaType E)
        顯示 setp-2-selected-result :
            顯示 217,218          
            隱藏 211,212,213,214,215,216,219,220

    click 2-1-2 此為取消 , 隱藏 setp-2-selected-result 
    click 2-1-4 此為確認 , 
    顯示 setp-3-item 
    隱藏 setp-2-selected-result , setp-2-0-select , step-2-item

3. setp-3-item
    delay 一秒後顯示 setp-3-select
    click 301 (紀錄cupType A)
            顯示 setp-3-selected-result :
            顯示 311,312            
            隱藏 313,314,315,316,317,318
    click 302 (紀錄cupType B)
            顯示 setp-3-selected-result :
            顯示 313,314            
            隱藏 311,312,315,316,317,318
    click 303 (紀錄cupType C)
            顯示 setp-3-selected-result :
            顯示 315,316            
            隱藏 311,312,313,314,317,318
    click 304 (紀錄cupType D)
            顯示 setp-3-selected-result :
            顯示 317,318            
            隱藏 311,312,313,314,315,316
    click 3-1-9 此為取消 , 隱藏 setp-3-selected-result
    click 3-1-11 此為確認 , 
        隱藏setp-3-selected-result
        顯示 step4-item , 隱藏step3-item
    
4. step4-item
    delay 一秒後顯示 setp-4-select
    click 401 :
        隱藏 4-0-0,4-0-1,4-0-2
        顯示 setp-4-1:
            click 4-1-7 為取消, 隱藏step-4-1 . 顯示 4-0-0,4-0-1,4-0-2
            隱藏 80c,85c,90c,95c,100c
            click 70c : 顯示80c
            click 80c : 顯示85c
            click 85c : 顯示90c
            click 90c : 顯示95c
            click 95c : 顯示100c
            click 100c : 隱藏 setp-4-1,step-4-select,顯示 step-4-2

5. step-4-2 :
    隱藏 4-2-7 , 隱藏 4-2-6
    click 4-2-10 : 隱藏 step-4-2 , 顯示 step-5-1

6. step-5-1:
    這裡要檢查 teaType

    A: 
    隱藏 5-1-2-1,5-1-2-2
    隱藏 5-1-3-1,5-1-3-2
    隱藏 5-1-4-1,5-1-4-2
    隱藏 5-1-5-1,5-1-5-2
    播放 RUN-A.gif 於位置 5-1-6-2 
    B: 
    隱藏 5-1-3-1,5-1-3-2
    隱藏 5-1-4-1,5-1-4-2
    隱藏 5-1-5-1,5-1-5-2
    隱藏 5-1-6-1,5-1-6-2
    播放 RUN-B.gif 於位置 5-1-5-2
    C: 
    隱藏 5-1-2-1,5-1-2-2
    隱藏 5-1-3-1,5-1-3-2
    隱藏 5-1-5-1,5-1-5-2
    隱藏 5-1-6-1,5-1-6-2
    播放 RUN-C.gif 於位置 5-1-4-2
    D: 
    隱藏 5-1-4-1,5-1-4-2
    隱藏 5-1-3-1,5-1-3-2
    隱藏 5-1-5-1,5-1-5-2
    隱藏 5-1-6-1,5-1-6-2
    播放 RUN-D.gif 於位置 5-1-2-2
    E: 
    隱藏 5-1-4-1,5-1-4-2
    隱藏 5-1-2-1,5-1-2-2
    隱藏 5-1-5-1,5-1-5-2
    隱藏 5-1-6-1,5-1-6-2
    播放 RUN-E.gif 於位置 5-1-3-2

    click 5-1-5 , 隱藏 step-5-1, 顯示 step-6-1    
        

8. step-6-1
    點擊 data-name="step-6-1-6" : 隱藏 data-name="step-6-1" 顯示 data-name="step-7-1" 
    點擊 data-name="step-6-1-5" : 隱藏 data-name="step-6-1" 顯示 data-name="step-7-1" 
