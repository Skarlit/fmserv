name := """sms"""
organization := "com.sms"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.12.6"

libraryDependencies += javaWs
libraryDependencies += guice
libraryDependencies += ehcache

libraryDependencies += "com.google.auto.value" % "auto-value" % "1.6.2" % "provided"
libraryDependencies += "com.google.auto.value" % "auto-value-annotations" % "1.6.2"
libraryDependencies += "com.google.protobuf" % "protobuf-java" % "3.6.1"
libraryDependencies += "com.google.protobuf" % "protobuf-java-util" % "3.6.1"
