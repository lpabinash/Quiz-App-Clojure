(ns quizapp.query
    (:refer-clojure :exclude [update])
  (:require [quizapp.database :refer [db]]
            [korma.core :refer :all]
            [schema.core :as s]
            [clojure.data.json :as json]
            [compojure.core :refer :all]
            (clojure.contrib [duck-streams :as ds])))

(s/defschema UserBody
             {:email s/Str})

(s/defschema UserBody
             {:UserID s/Int
              :email s/Str
              :mcqmark s/Int
              :descmark s/Int
              :status s/Bool})
(s/defschema AddBody
             {:email s/Str
              :mcqmark s/Int
              :descmark s/Int
              :status s/Bool})


(s/defschema UpdateBody
             {:UserID s/Int
              :descmark s/Int})

(s/defschema AddFileBody
             {:filename s/Str
              })



(defentity users)



(defn get-users []
  (select users))

(defn add-user [email mcqmark descmark status]
  (insert users
          (values {:email email
                   :mcqmark mcqmark
                   :descmark descmark
                   :status false})))

(defn delete-user [UserID]
  (delete users
          (where {:UserID UserID})))

(defn update-user [UserID descmark]
  (update users
          (set-fields {:descmark descmark
                       :status true})
          (where {:UserID UserID})))

(defn get-user [UserID]
  (first    (select users
            (where {:UserID UserID}))))



(defn get-answers [filePath]
(json/read-str (slurp (format "D://data/%s.json" filePath))
:key-fn keyword)) 

(defn readFile [filePath]
  (let [content (json/read-str (slurp (format "D://data/%s.json" filePath))
                                   :key-fn keyword)
        multiple-choice-questions (-> content :questions :mcq)
        descriptive-questions (-> content :questions :descriptive)]
    (doseq [question-answer-map multiple-choice-questions
          :let [{:keys [question option-a option-b option-c option-d answer]} question-answer-map]]
      (println "question -->" question)
      (println "option-a -->" option-a)
      (println "option-b -->" option-b)
      (println "option-c -->" option-c)
      (println "option-d -->" option-d)
      (println "ans -->" answer))))

(defn upload-file
          [file]
                (ds/copy (file :tempfile) (ds/file-str "file.out"))
                      )

