
(ns app1.database
  (:require [korma.db :as korma]))

(def   db-connection-info (korma/mysql                          {:classname "com.mysql.cj.jdbc.Driver"                           :subprotocol "mysql"                           :user ""
                                                                 :subname "//localhost:3000/exam"}))

; set up korma
(korma/defdb db db-connection-info)