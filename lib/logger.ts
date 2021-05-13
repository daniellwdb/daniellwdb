import pino from "pino"

export default pino({
  name: "website",
  ...(process.env.NODE_ENV === "development" && {
    prettyPrint: {
      colorize: true,
      ignore: "hostname,pid",
      translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
    },
  }),
})
