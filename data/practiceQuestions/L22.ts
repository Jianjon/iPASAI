import type { PracticeQuestion } from '../../types';

export const L22_PRACTICE: Record<string, PracticeQuestion[]> = {
  L22101: [
    {
      question: '在分析一組包含極端高收入者的薪資數據時，哪個集中趨勢量數最能代表「典型」的薪資水平？',
      options: {
        A: '平均數 (Mean)',
        B: '中位數 (Median)',
        C: '眾數 (Mode)',
        D: '全距 (Range)'
      },
      correctAnswer: 'B',
      explanation: '中位數對極端值（離群值）不敏感，因此在數據分佈不對稱或存在極端值時，它比平均數更能代表數據的中心趨勢。'
    },
    {
      question: '盒狀圖 (Box Plot) 主要用於展示數據的什麼資訊？',
      options: {
        A: '兩個變數之間的線性關係。',
        B: '數據隨時間的變化趨勢。',
        C: '單一變數的頻率分佈。',
        D: '中位數、四分位距以及離群值。'
      },
      correctAnswer: 'D',
      explanation: '盒狀圖能非常精簡地概括數據的分佈情況，包括中心位置（中位數）、離散程度（四分位距IQR）以及是否存在異常的離群值。'
    }
  ],
  L22102: [
    {
      question: '某城市的數據顯示，平均每小時有10起交通事故，且事故發生是獨立的。若要對一小時內發生的事故次數進行建模，最適合使用哪種機率分佈？',
      options: {
        A: '常態分佈 (Normal Distribution)',
        B: '二項分佈 (Binomial Distribution)',
        C: '泊松分佈 (Poisson Distribution)',
        D: '均勻分佈 (Uniform Distribution)'
      },
      correctAnswer: 'C',
      explanation: '泊松分佈專門用來描述在一個固定的時間間隔或空間區域內，某個獨立隨機事件發生的次數。'
    },
    {
      question: '中央極限定理 (CLT) 的核心結論是什麼？',
      options: {
        A: '任何數據集最終都會呈現常態分佈。',
        B: '只要樣本量足夠大，樣本平均數的抽樣分佈會近似於常態分佈。',
        C: '只有來自常態分佈母體的樣本，其平均數才會是常態分佈。',
        D: '樣本量越大，樣本的變異數越小。'
      },
      correctAnswer: 'B',
      explanation: 'CLT的強大之處在於，不論原始母體的分佈如何，只要樣本量足夠大，其樣本均值的抽樣分佈就會趨近於常態分佈。這是統計推斷的理論基石。'
    }
  ],
  L22103: [
    {
      question: '在假設檢定中，P值的正確定義是什麼？',
      options: {
        A: '虛無假設(H0)為真的機率。',
        B: '對立假設(H1)為真的機率。',
        C: '在假定H0為真的前提下，觀測到當前或更極端結果的機率。',
        D: '實驗結果出錯的機率。'
      },
      correctAnswer: 'C',
      explanation: 'P值衡量的是樣本證據與虛無假設之間的不一致程度。P值越小，表示我們的觀測結果在H0為真的情況下越不可能發生，因此我們越有理由拒絕H0。'
    },
    {
      question: '在進行A/B測試時，若錯誤地拒絕了虛無假設（即新舊版本無差異），而宣稱新版本效果更好，這屬於哪種類型的錯誤？',
      options: {
        A: '第一類型錯誤 (Type I Error)',
        B: '第二類型錯誤 (Type II Error)',
        C: '隨機錯誤',
        D: '系統錯誤'
      },
      correctAnswer: 'A',
      explanation: '第一類型錯誤（棄真錯誤）指的是虛無假設實際上為真，但我們卻錯誤地拒絕了它。其發生的機率由我們預設的顯著水準α控制。'
    }
  ],
  L22201: [
    {
      question: '在數據清理過程中，面對數據中的缺失值，下列哪種處理方法最為簡單快速，但可能扭曲數據分佈？',
      options: {
        A: '用特徵的中位數或平均數插補。',
        B: '直接刪除含有缺失值的整行數據。',
        C: '使用K-NN模型預測並填補缺失值。',
        D: '將「缺失」本身作為一個新的特徵。'
      },
      correctAnswer: 'A',
      explanation: '使用均值、中位數或眾數進行插補是最簡單的方法，但它會降低數據的變異性，可能影響後續分析的準確性。'
    },
    {
        question: '從網站伺服器、應用程式或IoT設備產生的行為日誌，屬於哪一類數據收集來源？',
        options: {
            A: 'API (應用程式介面)',
            B: '網路爬蟲 (Web Scraping)',
            C: '資料庫查詢',
            D: '日誌文件 (Log Files)'
        },
        correctAnswer: 'D',
        explanation: '日誌文件是系統或應用在運行時自動生成的記錄，包含了詳細的時間戳和事件資訊，是分析用戶行為和診斷系統問題的重要數據源。'
    }
  ],
  L22202: [
    {
        question: '下列哪種資料庫技術最適合儲存和查詢複雜的網絡關係，例如社群網路中的「好友的好友」？',
        options: {
            A: '鍵值儲存 (Key-Value)',
            B: '文件儲存 (Document)',
            C: '關聯式資料庫 (RDBMS)',
            D: '圖形資料庫 (Graph)'
        },
        correctAnswer: 'D',
        explanation: '圖形資料庫（如Neo4j）專為儲存節點和邊（關係）而設計，對於遍歷和查詢複雜的、多層次的網絡關係，其性能遠超其他類型的資料庫。'
    },
    {
        question: '「讀取時綱要 (Schema-on-Read)」是下列哪種數據儲存架構的核心特性？',
        options: {
            A: '關聯式資料庫 (RDBMS)',
            B: '數據倉儲 (Data Warehouse)',
            C: '數據湖 (Data Lake)',
            D: '線上交易處理系統 (OLTP)'
        },
        correctAnswer: 'C',
        explanation: '數據湖允許以原始格式儲存任何類型的數據，在進行分析（讀取）時才定義其結構。這與RDBMS和數據倉儲的「寫入時綱要」形成對比，為數據科學家提供了極大的靈活性。'
    }
  ],
  L22203: [
    {
        question: '相較於Hadoop MapReduce，Apache Spark最主要的性能優勢來自於？',
        options: {
            A: '使用Java語言編寫。',
            B: '基於記憶體的運算 (In-Memory Computing)。',
            C: '更好的磁碟讀寫效率。',
            D: '與HDFS的整合更緊密。'
        },
        correctAnswer: 'B',
        explanation: 'Spark將中間計算結果盡可能地保留在記憶體中，避免了MapReduce在每一步計算後都需要讀寫磁碟的瓶頸，因此在迭代式計算和交互式查詢場景下，速度可以快上百倍。'
    },
    {
      question: 'MapReduce編程模型的核心思想是什麼？',
      options: {
          A: '將所有數據載入單一伺服器的記憶體中進行處理。',
          B: '將大型計算任務「分而治之」，透過Map和Reduce兩個階段進行平行處理。',
          C: '專門為即時串流數據處理設計。',
          D: '一種用於查詢關聯式資料庫的語言。'
      },
      correctAnswer: 'B',
      explanation: 'MapReduce的核心是「分而治之」。Map階段負責將任務分解並行化，Reduce階段負責將並行處理的結果進行匯總，從而實現對大規模數據集的處理。'
    },
    {
        question: '在Spark生態系統中，哪個元件專門用於處理結構化數據和執行SQL查詢？',
        options: {
            A: 'Spark Core',
            B: 'MLlib',
            C: 'Structured Streaming',
            D: 'Spark SQL'
        },
        correctAnswer: 'D',
        explanation: 'Spark SQL是Spark中用於處理結構化數據的模組，它允許開發者使用SQL語句或DataFrame API來進行高效的數據查詢和分析。'
    }
  ],
  L22301: [
    {
        question: '在大數據分析中，為何「實際顯著性 (Practical Significance)」與「統計顯著性 (Statistical Significance)」同等重要？',
        options: {
            A: '因為大樣本量會讓任何微小的差異都變得統計顯著，但這些差異可能沒有商業價值。',
            B: '因為兩者是完全相同的概念。',
            C: '因為實際顯著性決定了P值的大小。',
            D: '因為在大數據中無法計算統計顯著性。'
        },
        correctAnswer: 'A',
        explanation: '大數據會放大統計顯著性，導致即使是非常微小的、在商業上無意義的效果（低實際顯著性），其P值也可能很小。因此必須結合效應量(Effect Size)來判斷結果是否真的重要。'
    },
    {
        question: 'A/B測試能夠進行可靠的因果推斷，其最關鍵的步驟是什麼？',
        options: {
            A: '確保實驗組的樣本量遠大於控制組。',
            B: '對用戶進行隨機分流。',
            C: '在實驗後對用戶進行問卷調查。',
            D: '選擇一個非常小的P值門檻。'
        },
        correctAnswer: 'B',
        explanation: '隨機化是A/B測試的靈魂。透過將用戶隨機分配到不同組別，可以確保兩組用戶在所有其他潛在的混淆變數上是統計上相似的，從而將觀測到的差異歸因於我們所做的唯一改變。'
    },
    {
        question: '在對一個包含不同用戶等級（如免費、付費、VIP）的數據集進行抽樣時，為了確保樣本中各等級用戶的比例與母體一致，應採用哪種抽樣方法？',
        options: {
            A: '簡單隨機抽樣',
            B: '系統抽樣',
            C: '分層抽樣',
            D: '叢集抽樣'
        },
        correctAnswer: 'C',
        explanation: '分層抽樣先將母體按特定變數分層，再從每層中按比例抽樣。這能確保樣本的結構與母體一致，對於提高推斷的準確性非常重要。'
    }
  ],
  L22302: [
    {
        question: '「購物籃分析」中最常用來發現「啤酒與尿布」這類商品關聯性的分析方法是？',
        options: {
            A: '聚類分析 (Clustering)',
            B: '分類分析 (Classification)',
            C: '迴歸分析 (Regression)',
            D: '關聯規則分析 (Association Rule Mining)'
        },
        correctAnswer: 'D',
        explanation: '關聯規則分析專門用於從交易數據中發現項目之間有趣的併發關係，其核心指標包括支持度、信賴度和提升度。'
    },
    {
        question: '下列哪個分析方法屬於「非監督式學習」？',
        options: {
            A: '線性迴歸',
            B: 'K-均值聚類 (K-Means)',
            C: '隨機森林',
            D: '邏輯迴歸'
        },
        correctAnswer: 'B',
        explanation: 'K-均值聚類是一種非監督式學習演算法，因為它處理的是沒有預先標籤的數據，其目標是自動發現數據中的群體結構。其他選項都是監督式學習演算法。'
    },
    {
        question: '預測一位客戶未來的消費金額，這個問題屬於哪一類大數據分析方法？',
        options: {
            A: '聚類分析',
            B: '分類分析',
            C: '迴歸分析',
            D: '關聯規則分析'
        },
        correctAnswer: 'C',
        explanation: '由於「消費金額」是一個連續的數值，預測這類數值的問題屬於迴歸分析的範疇。'
    }
  ],
  L22303: [
    {
        question: '若要展示單一數值變數（如用戶年齡）的頻率分佈情況，最適合使用哪種圖表？',
        options: {
            A: '折線圖 (Line Chart)',
            B: '散佈圖 (Scatter Plot)',
            C: '直方圖 (Histogram)',
            D: '圓餅圖 (Pie Chart)'
        },
        correctAnswer: 'C',
        explanation: '直方圖是觀察單一數值變數分佈形狀、集中趨勢和離散程度的最佳工具。'
    },
    {
        question: '由Edward Tufte提出的「數據墨水比 (Data-Ink Ratio)」設計原則，其核心思想是什麼？',
        options: {
            A: '圖表中使用的顏色越多越好。',
            B: '盡可能地刪除圖表中非必要的裝飾性元素，讓數據成為視覺焦點。',
            C: '圖表的標題和標籤應該用最華麗的字體。',
            D: '3D效果能讓圖表更具說服力。'
        },
        correctAnswer: 'B',
        explanation: '這個原則強調簡潔和清晰，主張一個好的圖表應該將最多的「墨水」用於呈現數據本身，而不是無關的背景、網格線、特效等「圖表垃圾」。'
    },
    {
        question: '下列哪個商業智慧(BI)工具與Google生態系統（如GA, BigQuery）的整合最為無縫？',
        options: {
            A: 'Tableau',
            B: 'Microsoft Power BI',
            C: 'Google Looker Studio',
            D: 'Qlik Sense'
        },
        correctAnswer: 'C',
        explanation: 'Google Looker Studio (原Data Studio) 是Google自家的BI產品，因此它與Google Analytics, Google Ads, BigQuery, Google Sheets等其他Google服務的數據連接器最為完善和易用。'
    }
  ],
  L22401: [
    {
        question: '大數據與機器學習的關係，下列敘述何者最為貼切？',
        options: {
            A: '兩者是相互競爭的技術。',
            B: '大數據為機器學習提供了豐富的「燃料」，使其能學習到更複雜的模式。',
            C: '機器學習主要用於處理小數據，大數據需要其他技術。',
            D: '有了大數據就不再需要機器學習。'
        },
        correctAnswer: 'B',
        explanation: '大數據和機器學習是共生關係。大數據的規模和多樣性是現代機器學習（尤其是深度學習）模型能夠取得成功的關鍵前提，而機器學習是從大數據中提取價值的核心引擎。'
    },
    {
        question: '在分散式機器學習中，「數據並行 (Data Parallelism)」指的是什麼？',
        options: {
            A: '將一個巨大的模型切分到多台機器上。',
            B: '將數據集切分成多份，在多台機器上用同一個模型的複製品並行訓練。',
            C: '同時使用多種不同的演算法進行訓練。',
            D: '使用CPU和GPU並行進行計算。'
        },
        correctAnswer: 'B',
        explanation: '數據並行是最常見的分散式訓練策略。它透過將數據分發到不同節點，來加速對整個數據集的處理，每個節點上都有一個完整的模型複製品。'
    }
  ],
  L22402: [
    {
        question: '鑑別式AI (Discriminative AI) 的核心學習目標是什麼？',
        options: {
            A: '學習數據的潛在分佈 P(X)。',
            B: '直接學習不同類別之間的決策邊界，即條件機率 P(Y|X)。',
            C: '生成與訓練數據相似的全新數據。',
            D: '將數據分為不同的群組。'
        },
        correctAnswer: 'B',
        explanation: '鑑別式模型不關心數據是如何生成的，它只專注於一個目標：給定一個輸入X，如何最好地判斷它屬於哪個類別Y。'
    },
    {
        question: '下列何者是「大數據在鑑別式AI中的應用」的典型例子？',
        options: {
            A: '使用ChatGPT撰寫一篇文章。',
            B: '利用數百萬張已標註的病理切片，訓練一個癌症影像診斷模型。',
            C: '使用Midjourney生成一張圖片。',
            D: '發現超市購物數據中「啤酒與尿布」的關聯。'
        },
        correctAnswer: 'B',
        explanation: '癌症影像診斷是一個典型的分類問題（鑑別任務），其高準確率依賴於在海量的、帶有專家標註的圖像大數據上進行訓練。A和C是生成式AI，D是關聯規則分析。'
    }
  ],
  L22403: [
    {
        question: '生成式AI (Generative AI) 的核心學習目標是什麼？',
        options: {
            A: '學習數據的潛在分佈 P(X)，以便能生成新數據。',
            B: '學習如何將數據點準確分類。',
            C: '預測一個連續的數值。',
            D: '從數據中移除噪聲。'
        },
        correctAnswer: 'A',
        explanation: '生成式模型的核心是理解數據的「內在規律」和「結構」，即學習其機率分佈P(X)。一旦學會了這個分佈，就能從中進行採樣，創造出全新的、符合該分佈的數據。'
    },
    {
        question: '為何網際網路級別的大數據對於訓練大型語言模型 (LLMs) 至關重要？',
        options: {
            A: '因為大數據的下載速度比較快。',
            B: '因為只有海量、多樣化的數據才能讓模型學會語言的複雜模式和世界知識。',
            C: '因為大數據中不包含任何個人隱私。',
            D: '因為法律規定必須使用大數據。'
        },
        correctAnswer: 'B',
        explanation: '人類語言的複雜性和其背後的世界知識是極其龐大的。只有讓模型「閱讀」網際網路規模的文本，它才能學到足夠的模式，從而具備強大的理解和生成能力。'
    }
  ],
  L22404: [
    {
        question: '下列哪項技術，透過在數據查詢或模型訓練中加入經過計算的噪聲，來提供數學上可證明的個人隱私保護？',
        options: {
            A: '數據加密 (Encryption)',
            B: '聯邦學習 (Federated Learning)',
            C: '差分隱私 (Differential Privacy)',
            D: 'K-匿名 (K-Anonymity)'
        },
        correctAnswer: 'C',
        explanation: '差分隱私是當前隱私保護領域的黃金標準，它透過對結果添加噪聲，使得任何單個用戶的數據對最終結果的影響都微乎其微，從而保護了個體資訊。'
    },
    {
        question: '歐盟的通用數據保護條例 (GDPR) 強調的核心原則不包含下列何者？',
        options: {
            A: '告知同意',
            B: '數據最小化',
            C: '數據最大化，即收集盡可能多的數據。',
            D: '目的限制'
        },
        correctAnswer: 'C',
        explanation: 'GDPR強調的是「數據最小化原則」，即企業只應收集為了達成特定、合法目的所必需的最少量數據，與「數據最大化」的理念完全相反。'
    },
    {
        question: '「數據保留在本地，只有模型的更新被加密後傳回中央伺服器進行聚合」，這描述了哪種隱私保護技術？',
        options: {
            A: '差分隱私',
            B: '聯邦學習',
            C: '數據加密',
            D: '數據去識別化'
        },
        correctAnswer: 'B',
        explanation: '聯邦學習是一種分散式的機器學習方法，它的核心優勢在於，原始的、可能包含敏感資訊的數據永遠不需要離開用戶的設備或本地伺服器，從而極大地保護了數據隱私。'
    }
  ]
};