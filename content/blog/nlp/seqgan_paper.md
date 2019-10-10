---
title: "SeqGANの論文を読む"
slug: "seqgan-paper"
tags: ["nlp","SeqGAN","論文"]
date: "2019-09-24T00:00:00+09:00"
published: true
---
SeqGAN: Sequence Generative Adversarial Nets with Policy Gradient

https://arxiv.org/pdf/1609.05473.pdf

SeqGANの論文を読んだのでまとめておきます。実装を行おうと思って読んだので手法をメインに読みます。
結果などは余力があれば加筆します。

## はじめに
文章生成では、LSTMcellを使ったRNNが優れたパフォーマンスを行う。一般的な学習法は対数尤度を最大化する方法だが、次のような問題点がある。

 - exposure bias(予測時には、自分の出力から次の語を予測することによるbias)
 - BLEUを使っても良いけど、詩やchatbotだと難しい

これらの問題に対して、General adversarial net(GAN)が有効そうである。ただし2つの問題がある。

- GANは連続データを生成するように設計されており、sequenceなどの離散データを直接生成するのは難しい。生成モデルGのパラメータの更新に識別モデルDの勾配を用いているが、微小な勾配により更新された生成モデルGに対応する出力値が離散のため存在しない可能性があるためである。
- GANは、生成された文全体に対して、score/lossのみを与えることができる。部分的に生成されたsequenceには、文全体としての現在と将来のscoreのバランスをどのようにうまく取れば良いかが自明でない。

そこで、生成モデルに強化学習を用いたGANであるSeqGANを提案する。


## Sequence Generative Adversarial Nets
生成モデル$G_ \theta $はパラメータを$\theta$として、$Y_ {1:T} = (y_ 1, y_ 2 , y_ T)$,$y_ t \in \mathcal Y$ を生成するために学習する。ここで、$\mathcal Y$はvocabularyを表す。

学習には、強化学習を用いる。時刻$t$において、状態$s$は現在の単語列$(y_ {1},y_ {2}, \ldots ,y_ {t-1})$を表し、行動$a$により次の単語$y_ t$を選択する。このため、方策モデル$G_ {\theta} (y_ {t}|Y_ {1:t-1})$ は確率的である。一方、行動を選択したあとでは、状態遷移は決定的である。つまり、もし現在の状態が$s=Y_ {1:t-1}$で行動が$a=y_ {t}$ならば、次の状態$s'=Y_ {1:t}$に対して、$\delta^a_ {s,s'}=1$である。そうでないなら、次の状態$s''$に対して$\delta^a_ {s,s''}=0$である。


加えて、パラメーター$\phi$を持つ識別モデル$D_ \phi$は、生成モデル$G_ \theta$を学習しながら正解を識別する。識別モデル$D_ \phi$は、本物の文章かどうかを確率的に識別する。

識別モデル$D_ \phi$は、正解文章と生成モデル$G_ \theta$から生成される不正解の文章を用いて学習する。同時に、生成モデル$G_ \theta$は、期待値と$D_ \phi$から得られる報酬に基づくMC searchにより学習する。

## SeqGAN via Policy Gradient
生成モデル(方策)$G_ \theta(y_ t|Y_ {1:t-1})$の目的は、単語列$s_ 0$が与えら得た時に得られる期待値を最大化あすることである。

$$ J(\theta) = E[R_ t|s_ 0,\theta ] = \sum_ {y_ 1 \in \it Y} G_ \theta (y_ 1|s_ 0)・Q^{G_ \theta}_ {D_ \phi}(s_ 0,y_ 1)$$

ここで、$R_ t$は、完全な文章に対する報酬を表す。この報酬は、$D_ {\phi}$から得られる。これは後に記述する。$Q^{G_ \theta}_ {D_ \phi}(s_ 0,y_ 1)$は、方策$G_ \theta$に従うaction-value functionである。

続いて、どのようにaction-value functionを推定するかだが、これには強化学習と識別モデル$D_ \phi$を報酬とし実際に推定される確率を用いる。

式は次のように表される。
$$ Q^{G_ \theta}_ {D_ \phi}(s=Y_ {1:T-1},a=y_ T) = D_ \phi(Y_ {1:T})$$

ただし、終了した文章に対してのみを識別モデルが生成する報酬として扱う。我々は、ステップごとに、長い期間の報酬を気にしているので、1つ前の単語の適応(fitness)だけについて考慮すべきでなく、将来の報酬についても考慮する必要がある。これは、ちょうど囲碁やチェスをゲームするのに似ている。


中間状態に対して、action-valueを評価することについてだが、まだ観測していない$T-t$の単語をサンプリングするために、roll-out policy$G_ \beta$を伴うMonte Carlo searchを適応する。

N-time Monte Carlo searchは次のように定式化される。

$$ \{ Y^1_ {1:T},...,Y^N_ {1:T} \} = MC^{G_ \beta}(Y_ {1:t},N) $$

実験では、$G_ \beta$は、生成器と同様にセットされた。(速度が必要ならば簡易版でも良い)

分散を下げ、またaction-valueのより良い精度を得るため、現在の状態から文章の最後までのN回のroll-out pulicyを実行して、出力サンプルのbatchを得る。
以上から、以下の定式化が行える。

$$ Q^{G_ \theta}_ {D_ \phi}(s=Y_ {1:T-1},a=y_ T) = \frac{1}{N} \sum_ {n=1}^N D_ \phi(T^n_ {1:T}, Y^n_ {1:T} \in MC^{G_ \beta}(Y_ {1:t};N)) \, {\rm for} \, t < T$$

$$ Q^{G_ \theta}_ {D_ \phi}(s=Y_ {1:T-1},a=y_ T) = D_ \phi(T^n_ {1:T}, Y^n_ {1:T}) \, {\rm for} \, t=T$$

中間の報酬がないとき、関数は、状態$s'=Y_ {1:t}$から始まりrole-outの終わりまでのnext-state valueとして繰り返し定義される。

識別モデル$D_ {\phi}$を使った報酬は、生成モデルを繰り返し学習するために、動的に更新される。より現実的な文章のセットが生成されると、次のように識別モデルを更新する。

$$
min_ \phi - \mathbb E_ {Y〜p_ {data}}[log D_ {\phi}(Y)] - \mathbb  E_ {Y〜G_ {\theta}}[log (1 - D_ {\phi}(Y))]
$$

ようは、クロスエントロピーである。
一方、生成モデルの目的関数$J(\theta)$は、以下のようになる。

$\nabla_ {\theta}J(\theta) = \sum_ {t=1}^{T} \mathbb E_ {y_ {t}〜G_ {\theta}(y_ t|Y_ {1:t-1})}[\nabla_ {\theta}logG_ \theta(y_ t|Y_ {1:t-1})・Q_ {D_ \phi}^{G_ \theta}(Y_ {1:t-1,y_ t})]$

ここで、$Y_ {1:t-1}$は生成モデル$G_ \theta$によりサンプリングされた観測される中間状態を表す。

サンプリング手法で$\mathbb E[・]$は近似することができるので、生成モデルのパラメーターは次のように更新される。

$$ \theta = \theta + \alpha \nabla_ \theta J(\theta)$$

ここで、$\alpha_ h$は$h$ステップ目の学習率を表す。勾配法としては、AdamかRMSpropを使う。


## The Generative Model for Sequences
生成モデルとして、LSTMをつかう。


## The Discriminative Model for Sequences
識別モデルには、CNNをつかう。

入力文章を次のように表す。
$$ \varepsilon_ {1:T} = x_ 1 \otimes	 x_ 2 \otimes \dots \otimes x_ t$$

ここで、$x_ t \in \mathbb R^k$はk次元にembeddingされた単語、$\otimes$は行列$\epsilon \in \mathbb R^{T \times k}$ を生成するたのconcatenation operatorを表す。

カーネル$ \boldsymbol{w} \in \mathbb R^{l \times k}$は、新しい特徴マップを生成するための$l$個の単語のwindow sizeへ適応する。(訳怪しい)

$$c_ i = \rho ( \boldsymbol{w} \otimes \varepsilon_ {i:i+l-1}+b )$$

ここで、$\otimes$は要素ごとの掛け算の和、$b$はバイアス、$\rho$は非線形関数を表す。異なるwindow sizeの様々なカーネルを適応し特徴量を抽出する。最後に、特徴マップ$\tilde{c}=max \lbrace c_ 1,\ldots,c_ {T-l+1} \rbrace $上にmax-over-timeプーリングを適応する。

パフォーマンス向上のためにthe pooled feature mapsに基づく、the highway architecture (Srivastava, Greff, and Schmidhuber 2015)を追加する。
最後に、活性化関数がシグモイド関数の全結合をつかい、正解か不正解の確率を出力する。
詳しい式は、appendixにかく。


## 参考
http://hirotaka-hachiya.hatenablog.com/entry/2017/02/27/222611
https://mil-tokyo.github.io/paper-summary/papers/20170320-SeqGAN
