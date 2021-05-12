 (defproject quizapp "0.1.0-SNAPSHOT"
   :description "FIXME: write description"
   :dependencies [[org.clojure/clojure "1.10.0"]
                  [metosin/compojure-api "2.0.0-alpha30"]
                  [ring/ring "1.6.3"]
                  [compojure "1.6.1"]
                  [manifold "0.1.8"]
                  [metosin/spec-tools "0.9.2"]
                  [korma "0.4.3"]
                  [mysql/mysql-connector-java "8.0.12"]
                   [ring "1.6.3"]
                 [ring-cors "0.1.11"]
                 [ring/ring-core "1.6.3"]
                 [ring/ring-mock "0.3.2"]
                 [ring/ring-json "0.5.0-beta1"]
                 [ring/ring-jetty-adapter "1.6.3"]
                 [ring-basic-authentication "1.0.5"]
                 [ring-token-authentication "0.1.0"]
                 [metosin/ring-http-response "0.9.0"]
]
   :ring {:handler quizapp.handler/handler}
   :uberjar-name "server.jar"
   :profiles {:dev {:dependencies [[javax.servlet/javax.servlet-api "3.1.0"]
                                  [ring/ring-mock "0.3.2"]]
                   :plugins [[lein-ring "0.12.5"]]}})
