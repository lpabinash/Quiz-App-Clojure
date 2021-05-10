(ns app1.query
  (:require [app1.database :refer [db]]
            [korma.core :refer :all]
            [schema.core :as s]))

(s/defschema UserBody
  {:email s/Str})

(s/defschema UserBody
  {:UserID s/Int
   :email s/Str
   :mcqmark s/Int
   :descmark s/Int
   :status s/Bool})


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
          (where {:userID UserID})))

(defn update-user [UserID descmark]
  (update users
          (set-fields {:descmark descmark
                       :status true})
          (where {:UserID UserID})))

(defn get-user [UserID]
  (first    (select users
                    (where {:UserID UserID}))))