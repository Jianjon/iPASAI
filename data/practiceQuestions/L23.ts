import type { PracticeQuestion } from '../../types';

export const L23_PRACTICE: Record<string, PracticeQuestion[]> = {
  L23101: [
    {
      question: '樸素貝氏分類器(Naive Bayes Classifier)的核心思想基於下列哪個數學定理？',
      options: {
        A: '中央極限定理 (Central Limit Theorem)',
        B: '大數法則 (Law of Large Numbers)',
        C: '貝氏定理 (Bayes\' Theorem)',
        D: '畢氏定理 (Pythagorean Theorem)'
      },
      correctAnswer: 'C',
      explanation: '樸素貝氏分類器直接應用貝氏定理，透過計算給定特徵下的後驗機率來進行分類。其「樸素」之處在於假設特徵之間是條件獨立的。'
    }
  ],
  L23102: [
    {
      question: '在神經網路中，從一層到下一層的計算，主要依賴下列哪項線性代數運算？',
      options: {
        A: '矩陣求逆 (Matrix Inversion)',
        B: '特徵值分解 (Eigen-decomposition)',
        C: '矩陣乘法 (Matrix Multiplication)',
        D: '行列式計算 (Determinant Calculation)'
      },
      correctAnswer: 'C',
      explanation: '神經網路的前向傳播可以簡潔地表示為對輸入向量進行一系列的矩陣乘法（乘以權重矩陣）和向量加法（加上偏置向量），然後通過激活函數。'
    },
    {
        question: '主成分分析 (PCA) 是一種常用的降維技術，其數學原理是找到數據的？',
        options: {
            A: '協方差矩陣的特徵向量。',
            B: '均值和中位數。',
            C: '貝氏後驗機率。',
            D: '梯度向量。'
        },
        correctAnswer: 'A',
        explanation: 'PCA通過計算數據協方差矩陣的特徵向量和特徵值，來找到數據中方差最大的方向（主成分）。將數據投影到最重要的幾個主成分上，即可達到降維的目的。'
    }
  ],
  L23103: [
    {
      question: '在訓練機器學習模型時，梯度下降法(Gradient Descent)中的「學習率(Learning Rate)」扮演什麼角色？',
      options: {
        A: '決定模型的最終準確率。',
        B: '控制每次參數更新的步長。',
        C: '衡量損失函數的複雜度。',
        D: '模型訓練需要花費的總時間。'
      },
      correctAnswer: 'B',
      explanation: '學習率是一個關鍵的超參數，它決定了在優化過程中沿著梯度反方向前進的每一步的大小。學習率過大會導致不收斂，過小則收斂太慢。'
    },
    {
        question: '相較於批量梯度下降，隨機梯度下降 (SGD) 的主要優點是什麼？',
        options: {
            A: '梯度計算更精確。',
            B: '收斂路徑更平滑。',
            C: '在處理大規模數據集時，更新速度更快。',
            D: '保證能找到全局最優解。'
        },
        correctAnswer: 'C',
        explanation: 'SGD每次只用一個樣本來更新參數，而批量梯度下降需要計算全部數據。因此在大數據集上，SGD的迭代速度遠遠快於批量梯度下降，儘管其收斂路徑會比較抖動。'
    }
  ],
  L23201: [
    {
      question: '下列哪項任務屬於「非監督式學習 (Unsupervised Learning)」的範疇？',
      options: {
        A: '根據房屋特徵預測其售價。',
        B: '判斷一封郵件是否為垃圾郵件。',
        C: '根據用戶的購買歷史，將用戶自動分為不同群組。',
        D: '識別圖片中的動物是貓還是狗。'
      },
      correctAnswer: 'C',
      explanation: '用戶分群（聚類）是一個典型的非監督式學習任務，因為數據中沒有預先定義好的「群組」標籤，演算法需要自動從數據中發現其內在結構。A、B、D都是有明確標籤的監督式學習任務。'
    },
    {
        question: '一個模型在訓練集上表現極好，但在新的測試集上表現很差。這個現象被稱為什麼？',
        options: {
            A: '欠擬合 (Underfitting)',
            B: '過擬合 (Overfitting)',
            C: '偏差 (Bias)',
            D: '數據漂移 (Data Drift)'
        },
        correctAnswer: 'B',
        explanation: '過擬合指的是模型過度學習了訓練數據中的噪聲和細節，導致其失去了泛化到新數據的能力。高方差(Variance)是過擬合的數學體現。'
    }
  ],
  L23202: [
    {
        question: '下列哪個演算法是透過集成學習(Ensemble Learning)中Bagging的思想，構建大量的決策樹來提升性能？',
        options: {
            A: '邏輯迴歸 (Logistic Regression)',
            B: '支援向量機 (SVM)',
            C: '隨機森林 (Random Forest)',
            D: 'K-均值聚類 (K-Means)'
        },
        correctAnswer: 'C',
        explanation: '隨機森林的核心思想就是Bagging（Bootstrap Aggregating）和特徵隨機化。它並行地訓練多棵決策樹，並透過投票或平均來匯總結果，有效降低了單棵決策樹容易過擬合的問題。'
    }
  ],
  L23203: [
    {
        question: '卷積神經網路 (CNN) 特別適用於處理圖像數據，其關鍵的優勢在於？',
        options: {
            A: '能夠處理時間序列的依賴關係。',
            B: '模型結構簡單，參數非常少。',
            C: '透過權重共享和局部連接，高效地提取空間層次特徵。',
            D: '訓練過程不需要GPU。'
        },
        correctAnswer: 'C',
        explanation: 'CNN的卷積操作利用了圖像的空間局部性原理，透過權重共享的卷積核來提取局部特徵，大大減少了模型參數，並能學習到從邊緣、紋理到物體部件的層次化特徵表示。'
    },
    {
        question: '相較於傳統的循環神經網路 (RNN)，Transformer架構最主要的創新是什麼？',
        options: {
            A: '引入了卷積操作來處理文本。',
            B: '完全基於自注意力機制 (Self-Attention) 來捕捉序列中的依賴關係。',
            C: '使用了更複雜的門控單元。',
            D: '大幅減少了模型的參數數量。'
        },
        correctAnswer: 'B',
        explanation: 'Transformer的革命性在於它完全拋棄了RNN的循環結構，而是依賴自注意力機制來並行地計算序列中所有元素之間的關係，從而更有效地捕捉長距離依賴，並極大地提升了訓練的平行度。'
    }
  ],
  L23301: [
    {
      question: '將一個包含「地區」特徵（如「信義區」、「大安區」）的欄位，轉換為多個二元（0/1）特徵欄位，這種處理方法被稱為什麼？',
      options: {
          A: '特徵縮放 (Feature Scaling)',
          B: '標籤編碼 (Label Encoding)',
          C: '獨熱編碼 (One-Hot Encoding)',
          D: '主成分分析 (PCA)'
      },
      correctAnswer: 'C',
      explanation: '獨熱編碼是處理無序類別特徵的標準方法，它避免為類別引入不應有的大小順序關係，讓模型能獨立地看待每一個類別。'
    },
    {
        question: '下列何者是「特徵洩漏 (Feature Leakage)」的典型例子？',
        options: {
            A: '在數據集劃分前，先對整個數據集進行標準化。',
            B: '從模型中移除了不相關的特徵。',
            C: '對訓練數據進行了數據增強。',
            D: '使用了L1正規化來進行特徵選擇。'
        },
        correctAnswer: 'A',
        explanation: '如果在劃分訓練/測試集之前，就使用了包含測試集資訊的統計量（如整個數據集的均值和標準差）來對訓練集進行轉換，這就將測試集的資訊洩漏給了訓練過程，會導致模型評估結果過於樂觀。'
    }
  ],
  L23302: [
    {
        question: '在機器學習工作流程中，測試集 (Test Set) 的主要用途是什麼？',
        options: {
            A: '用於訓練模型參數。',
            B: '用於調整模型的超參數。',
            C: '在模型開發完成後，提供一次性的、公正的最終性能評估。',
            D: '可以被多次使用以獲得最佳性能分數。'
        },
        correctAnswer: 'C',
        explanation: '為了得到模型在真實世界中泛化能力的無偏估計，測試集必須被「封存」起來，在整個模型選擇和調參過程結束後，才能拿出來使用一次。'
    },
    {
        question: '當數據量較少時，為了得到更穩健的模型性能評估，應優先考慮使用下列哪種方法？',
        options: {
            A: '使用更大的批次大小 (Batch Size)。',
            B: 'K-摺交叉驗證 (K-Fold Cross-Validation)。',
            C: '將數據全部用於訓練。',
            D: '使用固定的驗證集。'
        },
        correctAnswer: 'B',
        explanation: '交叉驗證透過多次劃分數據，讓每個樣本都有機會成為驗證集的一部分，從而得出的性能評估結果比單次劃分的結果更穩定、更可靠，有效降低了因數據劃分的隨機性帶來的偏差。'
    }
  ],
  L23303: [
    {
        question: '在一個極度不平衡的數據集上（如99%為負類），哪個評估指標最可能產生誤導？',
        options: {
            A: '準確率 (Accuracy)',
            B: '精確率 (Precision)',
            C: '召回率 (Recall)',
            D: 'F1-Score'
        },
        correctAnswer: 'A',
        explanation: '在這種情況下，一個簡單地將所有樣本都預測為負類的「無用」模型，其準確率也能高達99%。因此，單看準確率會極具誤導性，必須結合精確率、召回率等其他指標。'
    },
    {
        question: 'ROC曲線下的面積 (AUC) 為1，代表什麼？',
        options: {
            A: '模型的性能相當於隨機猜測。',
            B: '模型是一個完美的分類器。',
            C: '模型將所有樣本都預測為正類。',
            D: '模型將所有樣本都預測為負類。'
        },
        correctAnswer: 'B',
        explanation: 'AUC衡量的是模型區分正負樣本的整體能力。AUC為1代表模型能夠完美地將所有正樣本的預測機率排在所有負樣本之前，是一個理想的、完美的分類器。AUC為0.5則相當於隨機猜測。'
    }
  ],
  L23304: [
    {
        question: '下列哪項技術是透過結合多個「弱」學習器的預測，來得到一個更強大、更穩健的「強」學習器？',
        options: {
            A: '正規化 (Regularization)',
            B: '超參數調校 (Hyperparameter Tuning)',
            C: '集成學習 (Ensemble Learning)',
            D: '數據增強 (Data Augmentation)'
        },
        correctAnswer: 'C',
        explanation: '集成學習的核心思想就是「群策群力」。透過Bagging、Boosting、Stacking等方法，組合多個模型的預測，通常能獲得比任何單一模型都更好、更穩健的性能。'
    },
    {
        question: '在神經網路中加入Dropout層的主要目的是什麼？',
        options: {
            A: '加快模型的訓練速度。',
            B: '減少模型所需的記憶體。',
            C: '作為一種正規化手段，防止模型過擬合。',
            D: '增加模型的可解釋性。'
        },
        correctAnswer: 'C',
        explanation: 'Dropout透過在訓練時隨機地「關閉」一部分神經元，強迫網路學習到更具冗餘性和穩健性的特徵，這是一種非常有效的、防止模型過度依賴某些特定神經元的正規化技術。'
    }
  ],
  L23401: [
    {
        question: '下列哪種隱私保護技術，旨在提供數學上可證明的隱私保證，使得模型的輸出結果幾乎不受任何單個用戶數據的影響？',
        options: {
            A: '數據去識別化 (De-identification)',
            B: '差分隱私 (Differential Privacy)',
            C: 'K-匿名 (K-Anonymity)',
            D: '數據加密 (Encryption)'
        },
        correctAnswer: 'B',
        explanation: '差分隱私是當前隱私保護領域的黃金標準。它透過在查詢結果或模型參數中注入經過精確計算的噪聲，來模糊化單個數據點的貢獻，從而提供強大的隱私保護。'
    },
    {
        question: '在機器學習治理中，「最小化原則」指的是什麼？',
        options: {
            A: '盡可能地減小模型的檔案大小。',
            B: '只收集為了達成特定業務目的所必需的最少量數據。',
            C: '最小化模型訓練所需的時間。',
            D: '最小化模型的預測誤差。'
        },
        correctAnswer: 'B',
        explanation: '數據最小化是GDPR等隱私法規的核心原則之一，它要求企業在設計數據收集流程時，應避免收集非必要的個人數據，以從源頭上降低隱私風險。'
    }
  ],
  L23402: [
    {
        question: '一個臉部辨識模型，如果主要使用白人男性的照片進行訓練，導致其對其他族群和性別的識別準確率很低，這屬於哪種偏見來源？',
        options: {
            A: '歷史偏見 (Historical Bias)',
            B: '樣本偏見 (Representation Bias)',
            C: '衡量偏見 (Measurement Bias)',
            D: '演算法偏見 (Algorithmic Bias)'
        },
        correctAnswer: 'B',
        explanation: '樣本偏見（或稱代表性偏見）指的是訓練數據的採樣未能均衡地代表真實世界中的所有群體，導致模型對樣本量不足的群體產生偏見。'
    },
    {
        question: '在機器學習公平性中，「機會均等 (Equal Opportunity)」的定義是什麼？',
        options: {
            A: '模型對所有群體的整體準確率應該相等。',
            B: '模型對所有群體的預測結果比例應該相等。',
            C: '在所有【真正符合條件】的樣本中，不同群體被模型正確識別的機率（真陽性率）應該相等。',
            D: '所有個體都應該被模型給予相同的預測結果。'
        },
        correctAnswer: 'C',
        explanation: '機會均等關注的是，模型是否給予了不同群體中那些「應得的」個體以公平的機會。例如，在所有有能力還款的申請者中，模型批准貸款的比例不應因其種族而異。'
    }
  ]
};