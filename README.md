# HappyDoc Assessment

1. Edit the `.env.example` file. Instructions within.
1. In a terminal within the project directory, run

   ```sh
   docker compose up
   ```

1. Navigate to http://localhost:3000 and enjoy the weather updates.

## Testing

- Test the air quality message using Los Angeles, CA.
- As of writing this, ChatGPT says:
  - La Paz, Bolivia is cold (<55°F)
  - Kuwait City, Kuwait is very hot (>100°F)
- Check [weather.com](https://weather.com) for rain somewhere.
  - Very light rain
  - Mild rain
  - Heavy rain

## Notes

In the interest of time, I've ignored responsiveness (UI), some rendering optimizations, some input validations, and cross-browser/device testing.
