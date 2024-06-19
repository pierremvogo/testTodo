import { mock } from "./mock";
import "./person";
import "./task";

mock.onAny().passThrough()
