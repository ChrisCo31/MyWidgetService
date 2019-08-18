"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@aws-cdk/core");
const apigateway = require("@aws-cdk/aws-apigateway");
const lambda = require("@aws-cdk/aws-lambda");
const s3 = require("@aws-cdk/aws-s3");
class WidgetService extends core.Construct {
    constructor(scope, id) {
        super(scope, id);
        const bucket = new s3.Bucket(this, "WidgetStore");
        const handler = new lambda.Function(this, "WidgetHandler", {
            runtime: lambda.Runtime.NODEJS_8_10,
            code: lambda.Code.asset("resources"),
            handler: "widgets.main",
            environment: {
                BUCKET: bucket.bucketName
            }
        });
        bucket.grantReadWrite(handler); // was: handler.role);
        const api = new apigateway.RestApi(this, "widgets-api", {
            restApiName: "Widget Service",
            description: "This service serves widgets."
        });
        const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' }
        });
        api.root.addMethod("GET", getWidgetsIntegration); // GET /
        const widget = api.root.addResource("{id}");
        // Add new widget to bucket with: POST /{id}
        const postWidgetIntegration = new apigateway.LambdaIntegration(handler);
        // Get a specific widget from bucket with: GET /{id}
        const getWidgetIntegration = new apigateway.LambdaIntegration(handler);
        // Remove a specific widget from the bucket with: DELETE /{id}
        const deleteWidgetIntegration = new apigateway.LambdaIntegration(handler);
        widget.addMethod("POST", postWidgetIntegration); // POST /{id}
        widget.addMethod("GET", getWidgetIntegration); // GET /{id}
        widget.addMethod("DELETE", deleteWidgetIntegration); // DELETE /{id}
    }
}
exports.WidgetService = WidgetService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0X3NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWRnZXRfc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF1QztBQUN2QyxzREFBdUQ7QUFDdkQsOENBQStDO0FBQy9DLHNDQUF1QztBQUV2QyxNQUFhLGFBQWMsU0FBUSxJQUFJLENBQUMsU0FBUztJQUMvQyxZQUFZLEtBQXFCLEVBQUUsRUFBVTtRQUMzQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFbEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDekQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQ3BDLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLFdBQVcsRUFBRTtnQkFDWCxNQUFNLEVBQUUsTUFBTSxDQUFDLFVBQVU7YUFDMUI7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1FBRXRELE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3RELFdBQVcsRUFBRSxnQkFBZ0I7WUFDN0IsV0FBVyxFQUFFLDhCQUE4QjtTQUM1QyxDQUFDLENBQUM7UUFFSCxNQUFNLHFCQUFxQixHQUFHLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtZQUN0RSxnQkFBZ0IsRUFBRSxFQUFFLGtCQUFrQixFQUFFLHlCQUF5QixFQUFFO1NBQ3BFLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsUUFBUTtRQUUxRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1Qyw0Q0FBNEM7UUFDNUMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV4RSxvREFBb0Q7UUFDcEQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2RSw4REFBOEQ7UUFDOUQsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsYUFBYTtRQUM5RCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsWUFBWTtRQUMzRCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsZUFBZTtJQUV0RSxDQUFDO0NBQ0Y7QUE1Q0Qsc0NBNENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvcmUgPSByZXF1aXJlKFwiQGF3cy1jZGsvY29yZVwiKTtcbmltcG9ydCBhcGlnYXRld2F5ID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1hcGlnYXRld2F5XCIpO1xuaW1wb3J0IGxhbWJkYSA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtbGFtYmRhXCIpO1xuaW1wb3J0IHMzID0gcmVxdWlyZShcIkBhd3MtY2RrL2F3cy1zM1wiKTtcblxuZXhwb3J0IGNsYXNzIFdpZGdldFNlcnZpY2UgZXh0ZW5kcyBjb3JlLkNvbnN0cnVjdCB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjb3JlLkNvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCBidWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIFwiV2lkZ2V0U3RvcmVcIik7XG5cbiAgICBjb25zdCBoYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIldpZGdldEhhbmRsZXJcIiwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzhfMTAsIC8vIFNvIHdlIGNhbiB1c2UgYXN5bmMgaW4gd2lkZ2V0LmpzXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5hc3NldChcInJlc291cmNlc1wiKSxcbiAgICAgIGhhbmRsZXI6IFwid2lkZ2V0cy5tYWluXCIsXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBCVUNLRVQ6IGJ1Y2tldC5idWNrZXROYW1lXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBidWNrZXQuZ3JhbnRSZWFkV3JpdGUoaGFuZGxlcik7IC8vIHdhczogaGFuZGxlci5yb2xlKTtcblxuICAgIGNvbnN0IGFwaSA9IG5ldyBhcGlnYXRld2F5LlJlc3RBcGkodGhpcywgXCJ3aWRnZXRzLWFwaVwiLCB7XG4gICAgICByZXN0QXBpTmFtZTogXCJXaWRnZXQgU2VydmljZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiVGhpcyBzZXJ2aWNlIHNlcnZlcyB3aWRnZXRzLlwiXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRXaWRnZXRzSW50ZWdyYXRpb24gPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihoYW5kbGVyLCB7XG4gICAgICByZXF1ZXN0VGVtcGxhdGVzOiB7IFwiYXBwbGljYXRpb24vanNvblwiOiAneyBcInN0YXR1c0NvZGVcIjogXCIyMDBcIiB9JyB9XG4gICAgfSk7XG5cbiAgICBhcGkucm9vdC5hZGRNZXRob2QoXCJHRVRcIiwgZ2V0V2lkZ2V0c0ludGVncmF0aW9uKTsgLy8gR0VUIC9cbiAgICBcbiAgICBjb25zdCB3aWRnZXQgPSBhcGkucm9vdC5hZGRSZXNvdXJjZShcIntpZH1cIik7XG5cbiAgICAvLyBBZGQgbmV3IHdpZGdldCB0byBidWNrZXQgd2l0aDogUE9TVCAve2lkfVxuICAgIGNvbnN0IHBvc3RXaWRnZXRJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnYXRld2F5LkxhbWJkYUludGVncmF0aW9uKGhhbmRsZXIpO1xuXG4gICAgLy8gR2V0IGEgc3BlY2lmaWMgd2lkZ2V0IGZyb20gYnVja2V0IHdpdGg6IEdFVCAve2lkfVxuICAgIGNvbnN0IGdldFdpZGdldEludGVncmF0aW9uID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24oaGFuZGxlcik7XG5cbiAgICAvLyBSZW1vdmUgYSBzcGVjaWZpYyB3aWRnZXQgZnJvbSB0aGUgYnVja2V0IHdpdGg6IERFTEVURSAve2lkfVxuICAgIGNvbnN0IGRlbGV0ZVdpZGdldEludGVncmF0aW9uID0gbmV3IGFwaWdhdGV3YXkuTGFtYmRhSW50ZWdyYXRpb24oaGFuZGxlcik7XG5cbiAgICB3aWRnZXQuYWRkTWV0aG9kKFwiUE9TVFwiLCBwb3N0V2lkZ2V0SW50ZWdyYXRpb24pOyAvLyBQT1NUIC97aWR9XG4gICAgd2lkZ2V0LmFkZE1ldGhvZChcIkdFVFwiLCBnZXRXaWRnZXRJbnRlZ3JhdGlvbik7IC8vIEdFVCAve2lkfVxuICAgIHdpZGdldC5hZGRNZXRob2QoXCJERUxFVEVcIiwgZGVsZXRlV2lkZ2V0SW50ZWdyYXRpb24pOyAvLyBERUxFVEUgL3tpZH1cblxuICB9XG59Il19